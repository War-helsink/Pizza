import type { Metadata } from "next";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";

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

export default async function CheckoutLayout({
	children,
}: React.PropsWithChildren) {
	return (
		<div className="h-screen flex flex-col">
			<Suspense>
				<Header hasSearch={false} hasCart={false} />
			</Suspense>
			<main className="flex-grow relative overflow-y-auto">
				<Container>{children}</Container>
			</main>
		</div>
	);
}
