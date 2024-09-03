"use server";

import { cookies } from "next/headers";
import { sendEmail } from "@/libs/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, type Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { getUserSession } from "@/libs/get-user-session";

import {
	PayOrderTemplate,
	VerificationUserTemplate,
} from "@/components/shared/ui";
import type { CheckoutFormValues } from "@/config/checkout-form-schema";

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
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
			throw new Error("Cart not found");
		}

		if (data.totalPrice === 0) {
			throw new Error("Cart is empty");
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

		await sendEmail(
			data.email,
			`Next Pizza / Оплатите заказ #${order.id}`,
			PayOrderTemplate({
				orderId: order.id,
				totalPrice: order.totalPrice,
			}),
		);

		return "/";
	} catch (err) {
		console.error("[CreateOrder] Server error", err);
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error("Почта не подтверждена");
			}

			throw new Error("Пользователь уже существует");
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
			"Next Pizza / 📝 Подтверждение регистрации",
			VerificationUserTemplate({
				code,
			}),
		);
	} catch (err) {
		console.error("Error [CREATE_USER]", err);
		throw err;
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error("Пользователь не найден");
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
