"use client";

import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Title, Button } from "@/components/shared/ui";

import type { ProductCardProps } from "../../model/props";

export const ProductCard: React.FC<ProductCardProps> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	const { t } = useTranslation();

	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<img className="w-[215px] h-[215px]" src={imageUrl} alt={name} loading="lazy" />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

				<p className="text-sm text-gray-400">
					{ingredients.map((ingredient) => ingredient.name).join(", ")}
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						{t("product.from")} <b>{`${price} ${t("product.currency")}`}</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						{t("product.addCart")}
					</Button>
				</div>
			</Link>
		</div>
	);
};
