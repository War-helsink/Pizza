import { Title } from "@/components/shared/ui";
import { ProductCard } from "../ProductCard";

import type { ProductsGroupListProps } from "../../model/props";

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
	title,
	items,
	className,
}) => {
	return (
		<div className={className}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div className="grid grid-cols-3 gap-[50px]">
				{items.map((item, i) => (
					<ProductCard
						key={item.id}
						name="Маргарита"
						imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
						price={390}
						count={i % 2}
					/>
				))}
			</div>
		</div>
	);
};
