import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";

import initTranslations from "@/libs/i18n";
import type { Locale } from "@/@types/prisma";

export async function GET(req: NextRequest) {
	const locale = (req.cookies.get("NEXT_LOCALE")?.value || "uk") as Locale;
	const code = req.nextUrl.searchParams.get("code");
	const { t } = await initTranslations({ locale });

	try {
		if (!code) {
			return NextResponse.json(
				{ error: t("sever.invalidCode") },
				{ status: 400 },
			);
		}

		const verificationCode = await prisma.verificationCode.findFirst({
			where: {
				code,
			},
		});

		if (!verificationCode) {
			return NextResponse.json(
				{ error: t("sever.invalidCode") },
				{ status: 400 },
			);
		}

		await prisma.user.update({
			where: {
				id: verificationCode.userId,
			},
			data: {
				verified: new Date(),
			},
		});

		await prisma.verificationCode.delete({
			where: {
				id: verificationCode.id,
			},
		});

		return NextResponse.redirect(new URL("/?verified", req.url));
	} catch (error) {
		console.log("[VERIFY_GET] Server error", error);
		return NextResponse.json(
			{ error: t("sever.serverError") },
			{ status: 400 },
		);
	}
}
