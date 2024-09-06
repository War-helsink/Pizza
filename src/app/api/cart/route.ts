import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";

import crypto from "crypto";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";
import { getCart, getCartId, createCart, findOrCreateCart } from "@/libs/api";
import type { CreateCartItemValues } from "@/components/entities/cart";

export async function GET(req: NextRequest) {
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;
	const { t } = await initTranslations({ locale });

	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ items: [] });
		}

		const userCart = await findOrCreateCart(token, locale);

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_GET] Server error", error);
		return NextResponse.json(
			{ message: t("sever.errorFetchingCart") },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;
	const { t } = await initTranslations({ locale });

	try {
		let token = req.cookies.get("cartToken")?.value;

		let id: number;
		if (!token) {
			token = crypto.randomUUID();
			id = await createCart(token);
		} else {
			id = await getCartId(token);
		}

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: id,
				productItemId: data.productItemId,
				ingredients: {
					every: {
						id: { in: data.ingredients },
					},
				},
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
				},
			});
		}

		const newUserCart = await getCart(token, locale);

		const resp = NextResponse.json(newUserCart);
		resp.cookies.set("cartToken", token);
		return resp;
	} catch (error) {
		console.log("[CART_POST] Server error", error);
		return NextResponse.json(
			{ message: t("sever.errorCreatingCart") },
			{ status: 500 },
		);
	}
}
