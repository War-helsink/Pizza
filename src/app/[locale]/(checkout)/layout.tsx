import type { Metadata } from "next";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@/@types/prisma";

import { Suspense } from "react";
import { Container } from "@/components/shared/ui";
import { Header } from "@/components/widgets/header";

export async function generateMetadata({
	params: { locale },
}: { params: { locale: Locale } }): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		title: t("metadata:title.checkout"),
		description: t("metadata:description.checkout"),
	};
}

export default function CheckoutLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-[#F4F1EE]">
			<Suspense>
				<Header
					hasSearch={false}
					hasCart={false}
					className="border-b-gray-200"
				/>
			</Suspense>
			<main>
				<Container>{children}</Container>
			</main>
		</div>
	);
}
