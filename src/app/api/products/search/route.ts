import type { Locale } from "@/@types/prisma";
import { parse } from "cookie";
import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const keywords = req.nextUrl.searchParams.get("keywords") || "";
	const cookies = req.headers.get("cookie") || "";
	const parsedCookies = parse(cookies);
	const locale = (parsedCookies.NEXT_LOCALE || "uk") as Locale;

	const products = await prisma.product.findMany({
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
		where: {
			translations: {
				some: {
					name: {
						contains: keywords,
						mode: "insensitive",
					},
				},
			},
		},
		take: 5,
	});

	return NextResponse.json(products);
}
