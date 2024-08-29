import type { Metadata } from "next";
import initTranslations from "@/libs/i18n";
import { TopBar } from "@/components/widgets/top-bar";
import { Stories } from "@/components/widgets/stories";
import { ProductCatalog } from "@/components/widgets/product-catalog";

import { Container, Title } from "@/components/shared/ui";
import { findPizzas } from "@/libs/find-pizzas";

import type { Props } from "../interface";

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	return {
		title: t("metadata:title.default"),
	};
}

export default async function Home({
	params: { locale },
	searchParams,
}: Props) {
	const categories = await findPizzas(searchParams, locale);
	const { t } = await initTranslations({ locale });

	return (
		<>
			<Container>
				<div className="mt-10">
					<Title
						className="font-extrabold"
						text={t("page.home.title")}
						size="lg"
					/>
				</div>
			</Container>
			<TopBar categories={categories} />
			<Stories />
			<ProductCatalog categories={categories} />
		</>
	);
}
