import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Title, CountButton, Button } from "@/components/shared/ui";

import type { ProductCardProps } from "../../model/props";

export const ProductCard: React.FC<ProductCardProps> = ({
	name,
	price,
	count,
	imageUrl,
	className,
}) => {
	return (
		<div className={cn(className)}>
			<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
				<img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo" />
			</div>
			<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
			<p className="text-sm text-gray-400">
				Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
				альфредо, чеснок
			</p>

			<div className="flex justify-between items-center mt-4">
				<span className="text-[20px]">
					от <b>{price} ₽</b>
				</span>

				{count ? (
					<CountButton value={count} size="lg" />
				) : (
					<Button variant="secondary">
						<Plus className="w-4 h-4 mr-1" />
						Добавить
					</Button>
				)}
			</div>
		</div>
	);
};
