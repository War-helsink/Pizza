import { prisma } from "@/libs/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function GET(req: NextRequest) {
	const cookies = req.headers.get("cookie") || "";
	const parsedCookies = parse(cookies);
	const locale = parsedCookies.NEXT_LOCALE || "uk";

	const categories = await prisma.category.findMany({
		include: {
			translations: {
				where: {
					locale: locale as any,
				},
			},
		},
	});

	return NextResponse.json(categories);
}
