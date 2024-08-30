import type { Cart } from "@/@types/entities";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
	id: number;
	idProduct: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	disabled?: boolean;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
	items: CartStateItem[];
	totalAmount: number;
}

export const getCartDetails = (data: Cart): ReturnProps => {
	let totalAmount = 0;
	const items = data.items
		? (data.items.map((item) => {
				const price = calcCartItemTotalPrice(item);
				totalAmount += price;

				return {
					id: item.id,
					idProduct: item.productItem?.product?.id,
					quantity: item.quantity,
					name: item.productItem?.product?.name,
					imageUrl: item.productItem?.product?.imageUrl,
					price: price,
					pizzaSize: item.productItem?.size,
					pizzaType: item.productItem?.pizzaType,
					disabled: false,
					ingredients: item.ingredients?.map((ingredient) => ({
						name: ingredient.name,
						price: ingredient.price,
					})),
				};
			}) as CartStateItem[])
		: [];

	return {
		items,
		totalAmount: totalAmount,
	};
};
