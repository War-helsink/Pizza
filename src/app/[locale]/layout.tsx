import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { dir } from "i18next";
import initTranslations from "@/libs/i18n";
import { i18nConfig } from "@/config/i18next.config";
import { Providers } from "@/components/app/providers";

import type { RootLayoutProps, Props } from "./interface";
import "./globals.scss";

const nunito = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		metadataBase: null,
		manifest: "/manifest.json",
		description: t("metadata:description.default"),
		alternates: {
			canonical: "/",
			languages: {
				uk: "/",
				en: "/en",
				ru: "/ru",
			},
		},
		openGraph: {
			title: t("metadata:openGraph.title"),
			siteName: t("metadata:openGraph.siteName"),
			description: t("metadata:openGraph.description"),
			images: [
				{
					url: "/icon128.png",
					width: 128,
					height: 128,
					alt: "Pizza",
					type: "image/png",
				},
				{
					url: "/icon256.png",
					width: 256,
					height: 256,
					alt: "Pizza",
					type: "image/png",
				},
				{
					url: "/icon512.png",
					width: 512,
					height: 512,
					alt: "Pizza",
					type: "image/png",
				},
			],
			type: "website",
		},
	};
}

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params: { locale },
}: RootLayoutProps) {
	const { resources } = await initTranslations({ locale });

	return (
		<html lang={locale} dir={dir(locale)}>
			<body className={nunito.variable}>
				<Providers locale={locale} resources={resources}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
