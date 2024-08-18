import type { Metadata } from "next";
import { Inter } from "next/font/google";
import initTranslations from "@/lib/i18n";
import type { Props } from "./interface";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		metadataBase: null,
		manifest: "/manifest.json",
		title: t("metadata:title.default"),
		description: t("metadata:description.default"),
		icons: "/icon.ico",
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
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="h-screen p-4 flex flex-col items-center justify-center">
					{children}
				</main>
			</body>
		</html>
	);
}
