import type { Locale } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const keywords = req.nextUrl.searchParams.get("keywords") || "";
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;

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
