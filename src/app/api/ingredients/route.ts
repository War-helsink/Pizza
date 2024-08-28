import type { Locale } from "@/@types/prisma";
import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function GET(req: NextRequest) {
	const cookies = req.headers.get("cookie") || "";
	const parsedCookies = parse(cookies);
	const locale = (parsedCookies.NEXT_LOCALE || "uk") as Locale;

	const token = req.cookies.get("NEXT_LOCALE")?.value;

	console.log("NEXT_LOCALE", token);

	const ingredients = await prisma.ingredient.findMany({
		include: {
			translations: {
				where: {
					locale: locale,
				},
				select: {
					name: true,
				},
			},
			prices: {
				where: {
					locale: locale,
				},
				select: {
					price: true,
				},
			},
		},
	});

	return NextResponse.json(ingredients);
}
