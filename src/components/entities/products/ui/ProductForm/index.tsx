"use client";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ChoosePizzaForm } from "@/components/features/pizza";
import { ChooseProductForm } from "@/components/features/products";

import type { ProductFormProps } from "../../model/props";
import { useCart } from "@/hooks";

export const ProductForm: React.FC<ProductFormProps> = ({
	product,
	isPizza,
	onSubmit: _onSubmit,
}) => {
	const { addCartItem, isLoading } = useCart();
	const firstItem = product.items[0];
	const { t } = useTranslation();

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({
				productItemId: itemId,
				ingredients,
			});
			toast.success(
				t("toastMessages.success.productAdded", { name: product.name }),
			);

			_onSubmit?.();
		} catch (err) {
			toast.error(t("toastMessages.error.productAdded"));
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
				isLoading={isLoading}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			isLoading={isLoading}
		/>
	);
};
