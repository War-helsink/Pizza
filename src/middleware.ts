import { i18nRouter } from "next-i18n-router";
import type { NextRequest } from "next/server";
import { i18nConfig } from "@/config/i18next.config";

export async function middleware(req: NextRequest) {
	return i18nRouter(req, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: "/((?!api|static|.*\\..*|_next).*)",
};
