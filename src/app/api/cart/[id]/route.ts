import { getCart } from "@/libs/api";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;
	const { t } = await initTranslations({ locale });

	try {
		const id = Number(params.id);
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ error: t("server.errorTokenNotFound") });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: t("server.errorItemNotFound") });
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity,
			},
		});

		const userCart = await getCart(token, locale);

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_PATCH] Server error", error);
		return NextResponse.json(
			{ message: t("server.errorUpdatingCart") },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;
	const { t } = await initTranslations({ locale });

	try {
		const id = Number(params.id);
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ error: t("server.errorTokenNotFound") });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: t("server.errorItemNotFound") });
		}

		await prisma.cartItem.delete({
			where: {
				id: id,
			},
		});

		const userCart = await getCart(token, locale);

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_DELETE] Server error", error);
		return NextResponse.json(
			{ message: t("server.errorDeletingCart") },
			{ status: 500 },
		);
	}
}
