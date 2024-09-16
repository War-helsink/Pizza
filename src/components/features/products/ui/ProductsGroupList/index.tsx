"use client";

import { useRef, useEffect } from "react";
import { useIntersection } from "react-use";
import { useAppDispatch } from "@/components/app/store";
import { setCategoryId } from "@/components/entities/categories";
import { ProductCard } from "@/components/entities/products";

import { Title } from "@/components/shared/ui";

import type { ProductsGroupListProps } from "../../model/props";

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
	title,
	items,
	className,
	categoryId,
}) => {
	const dispatch = useAppDispatch();
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			dispatch(setCategoryId(categoryId));
		}
	}, [intersection, categoryId, dispatch]);

	return (
		<div className={className} ref={intersectionRef} id={categoryId.toString()}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div className="grid grid-cols-[repeat(auto-fit,260px)] gap-y-[50px] gap-x-1 justify-around">
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
