import initTranslations from "@/libs/i18n";
import { Header } from "@/components/widgets/header";
import { TopBar } from "@/components/widgets/top-bar";
import { PromoGallery } from "@/components/widgets/promo-gallery";
import { ProductCatalog } from "@/components/widgets/product-catalog";

import { Container, Title } from "@/components/shared/ui";

import type { Props } from "./interface";

export default async function Home({ params: { locale } }: Props) {
	const { t } = await initTranslations({ locale });

	return (
		<>
			<Header />
			<main className="flex-grow">
				<Container>
					<div className="mt-10">
						<Title
							className="font-extrabold"
							text={t("page.home.title")}
							size="lg"
						/>
					</div>
				</Container>
				<TopBar />
				<PromoGallery />
				<ProductCatalog />
			</main>
		</>
	);
}
