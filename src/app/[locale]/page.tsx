import initTranslations from "@/lib/i18n";
import { Header } from "@/components/widgets/header";
import { Title } from "@/components/widgets/title";
import { Categories } from "@/components/features/categories";

import { Container } from "@/components/shared/ui";

export default async function Home({
	params: { locale },
}: { params: { locale: string } }) {
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

					<div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 flex items-center justify-between">
						<Categories />
						{/* <SortPopup /> */}
					</div>
				</Container>
			</main>
		</>
	);
}
