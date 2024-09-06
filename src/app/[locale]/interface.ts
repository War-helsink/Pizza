import type { Locale } from "@prisma/client";
import type { GetSearchParams } from "@/libs/api";

export interface Props {
	params: { locale: Locale };
	searchParams: GetSearchParams;
}

export interface RootLayoutProps extends Props {
	children: React.ReactNode;
}
