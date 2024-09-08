import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";

import { Suspense } from "react";
import { Header } from "@/components/widgets/header";

export default async function RootLayout({
	params: { locale },
	children,
	modal,
}: {
	params: { locale: Locale };
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	const { t } = await initTranslations({ locale });

	return (
		<div className="flex flex-col min-h-dvh">
			<Suspense>
				<Header translation={t} />
			</Suspense>
			<main className="flex-grow">
				{children}
				{modal}
			</main>
		</div>
	);
}
