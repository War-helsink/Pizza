import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";

import { Suspense } from "react";
import { Container } from "@/components/shared/ui";
import { Header } from "@/components/widgets/header";

export default async function ProfileLayout({
	params: { locale },
	children,
}: { params: { locale: Locale } } & React.PropsWithChildren) {
	const { t } = await initTranslations({ locale });

	return (
		<>
			<Suspense>
				<Header translation={t} hasSearch={false} />
			</Suspense>
			<main className="flex-grow relative overflow-y-auto">
				<Container>{children}</Container>
			</main>
		</>
	);
}
