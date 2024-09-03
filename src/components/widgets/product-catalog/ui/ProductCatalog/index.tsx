import { Suspense } from "react";
import { Filters } from "@/components/features/filters";
import { ProductsGroupList } from "@/components/features/products";
import { Container } from "@/components/shared/ui";

import type { ProductCatalogProps } from "../../model/props";

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
	categories,
}) => {
	return (
		<Container>
			<div className="flex pb-14 gap-[60px]">
				<div className="w-[250px]">
				<Suspense>
					<Filters />
					</Suspense>
				</div>
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						{categories.map((category) => (
							<ProductsGroupList
								key={category.id}
								title={category.name}
								categoryId={category.id}
								items={category.products}
							/>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
};
