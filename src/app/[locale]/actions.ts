"use server";

import { cookies } from "next/headers";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@/@types/prisma";
import { sendEmail } from "@/libs/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, type Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { getUserSession } from "@/libs/get-user-session";

import { OrderCreationTemplate, VerifyEmailTemplate } from "@/templates";
import type { CheckoutFormValues } from "@/config/checkout-form-schema";

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;
		const locale = (cookieStore.get("NEXT_LOCALE")?.value || "uk") as Locale;
		const { t } = await initTranslations({ locale });

		if (!cartToken) {
			throw new Error(t("sever.cartTokenNotFound"));
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		if (!userCart) {
			throw new Error(t("sever.cartNotFound"));
		}

		if (data.totalPrice === 0) {
			throw new Error(t("sever.cartEmpty"));
		}

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: `${data.firstName} ${data.lastName}`,
				email: data.email,
				phone: data.phone,
				address: "",
				comment: data.comment,
				totalPrice: data.totalPrice,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		sendEmail(
			data.email,
			t("sever.orderCreationSubject", { orderId: order.id }),
			OrderCreationTemplate({
				lang: locale,
				translation: t,
				orderId: order.id,
				totalPrice: order.totalPrice,
			}) as React.ReactElement,
		).catch(error=>{
			console.log("[SEND_EMAIL] Server error", error)
		})

		return "/";
	} catch (err) {
		console.error("[CreateOrder] Server error", err);
		throw err;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const cookieStore = cookies();
		const locale = (cookieStore.get("NEXT_LOCALE")?.value || "uk") as Locale;
		const { t } = await initTranslations({ locale });

		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error(t("sever.emailNotVerified"));
			}

			throw new Error(t("sever.userExists"));
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail(
			createdUser.email,
			t("sever.registrationConfirmationSubject"),
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
			throw new Error(t("sever.userNotFound"));
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		});
	} catch (err) {
		console.error("Error [UPDATE_USER]", err);
		throw err;
	}
}
