"use client";

import { ChoosePizzaForm } from "@/components/features/pizza";
import { ChooseProductForm } from "@/components/features/products";
import toast from "react-hot-toast";

import type { ProductFormProps } from "../../model/props";

export const ProductForm: React.FC<ProductFormProps> = ({
	product,
	isPizza,
	onSubmit: _onSubmit,
}) => {
	const firstItem = product.items[0];

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			// const itemId = productItemId ?? firstItem.id;

			// await addCartItem({
			// 	productItemId: itemId,
			// 	ingredients,
			// });

			console.log("onSubmit");
			toast.success(`${product.name} добавлена в корзину`);

			// _onSubmit?.();
		} catch (err) {
			toast.error("Не удалось добавить товар в корзину");
			console.error(err);
		}
	};

	if (isPizza) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onSubmit}
				loading={false}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={false}
		/>
	);
};
