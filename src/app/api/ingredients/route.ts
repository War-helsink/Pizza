import type { Locale } from "@/@types/prisma";
import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;

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
		},
	});

	return NextResponse.json(ingredients);
}
