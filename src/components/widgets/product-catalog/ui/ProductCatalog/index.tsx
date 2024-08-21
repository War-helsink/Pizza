"use client";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/components/app/store";
import { Filters } from "@/components/features/filters";
import { Pagination } from "@/components/features/pagination";
import { ProductsGroupList } from "@/components/features/products";
import { Container } from "@/components/shared/ui";

export const ProductCatalog: React.FC = () => {
	const categories = useAppSelector((state) => state.category.categories);
	const { t } = useTranslation();

	return (
		<Container>
			<div className="flex pb-14 gap-[60px]">
				<div className="w-[250px]">
					<Filters />
				</div>
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						{categories.map((category) => (
							<ProductsGroupList
								key={category}
								title={t(`categories.${category}`)}
								categoryId={category}
								items={[1, 2, 3, 4, 5]}
							/>
						))}
					</div>

					<div className="flex items-center gap-6 mt-12">
						<Pagination pageCount={3} />
						<span className="text-sm text-gray-400">5 из 65</span>
					</div>
				</div>
			</div>
		</Container>
	);
};
