import type { Locale } from "@/@types/prisma";
import type { GetSearchParams } from "@/libs/find-pizzas";

export interface Props {
	params: { locale: Locale };
	searchParams: GetSearchParams;
}

export interface RootLayoutProps extends Props {
	children: React.ReactNode;
}
