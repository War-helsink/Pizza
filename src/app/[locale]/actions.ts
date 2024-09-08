"use server";

import { cookies } from "next/headers";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";
import { sendEmail } from "@/libs/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, type Prisma } from "@prisma/client";
import { hashSync, compare } from "bcrypt";
import { getUserSession } from "@/libs/get-user-session";
import type { TFormPasswordValues } from "@/components/features/auth";

import { OrderCreationTemplate, VerifyEmailTemplate } from "@/templates";
import type { CheckoutFormValues } from "@/config/checkout-form-schema";

export async function createOrder(formValues: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;
		const locale = (cookieStore.get("NEXT_LOCALE")?.value || "uk") as Locale;
		const { t } = await initTranslations({ locale });

		if (!cartToken) {
			throw new Error(t("server.cartTokenNotFound"));
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token: cartToken,
			},
			include: {
				user: true,
				items: {
					include: {
						ingredients: {
							include: {
								translations: {
									where: {
										locale: locale,
									},
									select: {
										name: true,
									},
								},
							},
						},
						productItem: {
							include: {
								product: {
									include: {
										translations: {
											where: {
												locale: locale,
											},
											select: {
												name: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		if (!userCart) {
			throw new Error(t("server.cartNotFound"));
		}

		if (formValues.totalPrice === 0) {
			throw new Error(t("server.cartEmpty"));
		}

		const order = await prisma.order.create({
			data: {
				userId: userCart.user ? userCart.user.id : null,
				token: cartToken,
				fullName: `${formValues.firstName} ${formValues.lastName}`,
				email: formValues.email,
				phone: formValues.phone,
				address: "",
				comment: formValues.comment,
				totalPrice: formValues.totalPrice,
				status: OrderStatus.PENDING,
				items: userCart.items,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		await sendEmail(
			formValues.email,
			t("server.orderCreationSubject", { orderId: order.id }),
			OrderCreationTemplate({
				lang: locale,
				translation: t,
				orderId: order.id,
				totalPrice: order.totalPrice,
			}) as React.ReactElement,
		).catch((error) => {
			console.log("[SEND_EMAIL] Server error", error);
		});

		return "/";
	} catch (err) {
		console.error("[CreateOrder] Server error", err);
		throw err;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;
		const locale = (cookieStore.get("NEXT_LOCALE")?.value || "uk") as Locale;
		const { t } = await initTranslations({ locale });

		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error(t("server.emailNotVerified"));
			}

			throw new Error(t("server.userExists"));
		}

		const createdUser = await prisma.user.create({
			data: {
				firstName: body.firstName,
				secondName: body.secondName,
				lastName: body.lastName,
				phone: body.phone,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		if (cartToken) {
			await prisma.cart.update({
				where: {
					token: cartToken,
				},
				data: {
					userId: createdUser.id,
				},
			});

			await prisma.order.updateMany({
				where: {
					token: cartToken,
				},
				data: {
					userId: createdUser.id,
				},
			});
		}

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail(
			createdUser.email,
			t("server.registrationConfirmationSubject"),
			VerifyEmailTemplate({
				lang: locale,
				code,
				translation: t,
			}) as React.ReactElement,
		);
	} catch (err) {
		console.error("Error [CREATE_USER]", err);
		throw err;
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const cookieStore = cookies();
		const locale = (cookieStore.get("NEXT_LOCALE")?.value || "uk") as Locale;
		const { t } = await initTranslations({ locale });

		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error(t("server.userNotFound"));
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				firstName: body.firstName,
				secondName: body.secondName,
				lastName: body.lastName,
				phone: body.phone,
				email: body.email,
			},
		});
	} catch (err) {
		console.error("Error [UPDATE_USER]", err);
		throw err;
	}
}

export async function updateUserPassword(data: TFormPasswordValues) {
	try {
		const cookieStore = cookies();
		const locale = (cookieStore.get("NEXT_LOCALE")?.value || "uk") as Locale;
		const { t } = await initTranslations({ locale });

		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error(t("server.userNotFound"));
		}

		const user = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
			select: {
				password: true,
			},
		});

		if (!user) {
			throw new Error(t("server.userNotFound"));
		}

		const isPasswordValid = await compare(data.password, user.password);

		if (!isPasswordValid) {
			throw new Error(t("server.confirmPassword"));
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				password: hashSync(data.newPassword, 10),
			},
		});
	} catch (err) {
		console.error("Error [UPDATE_USER]", err);
		throw err;
	}
}
