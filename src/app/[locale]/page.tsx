import initTranslations from "@/lib/i18n";
import { Header } from "@/components/widgets/header";
import { TopBar } from "@/components/widgets/top-bar";
import { Filters } from "@/components/features/filters";
import { Pagination } from "@/components/features/pagination";
import { ProductsGroupList } from "@/components/features/products-group";
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

				<Container>
					<div className="grid grid-cols-6 gap-2 my-10">
						<img
							className="rounded-md"
							height={250}
							width={200}
							alt=""
							src="https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496"
						/>
						<img
							className="rounded-md"
							height={250}
							width={200}
							alt=""
							src="https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640"
						/>
						<img
							className="rounded-md"
							height={250}
							width={200}
							alt=""
							src="https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020"
						/>
						<img
							className="rounded-md"
							height={250}
							width={200}
							alt=""
							src="https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496"
						/>
						<img
							className="rounded-md"
							height={250}
							width={200}
							alt=""
							src="https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640"
						/>
						<img
							className="rounded-md"
							height={250}
							width={200}
							alt=""
							src="https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020"
						/>
					</div>

					<div className="flex pb-14 gap-[60px]">
						<div className="w-[250px]">
							<Filters />
						</div>
						<div className="flex-1">
							<div className="flex flex-col gap-16">
								<ProductsGroupList title="Пиццы" items={[1, 2, 3, 4, 5]} />
								<ProductsGroupList title="Комбо" items={[1, 2, 3, 4, 5]} />
							</div>

							<div className="flex items-center gap-6 mt-12">
								<Pagination pageCount={3} />
								<span className="text-sm text-gray-400">5 из 65</span>
							</div>
						</div>
					</div>
				</Container>
			</main>
		</>
	);
}
