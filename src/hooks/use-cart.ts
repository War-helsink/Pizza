import type { CreateCartItemValues } from "@/components/entities/cart";
import type { CartStateItem } from "@/libs/get-cart-details";
import { useAppSelector } from "@/components/app/store";

import {
	useGetCartItemsQuery,
	useLazyAddCartItemQuery,
	useLazyRemoveCartItemQuery,
	useLazyUpdateItemQuantityQuery,
} from "@/components/entities/cart";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	isLoading: boolean;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
};

export const useCart = (): ReturnProps => {
	const { items, totalAmount, isLoading } = useAppSelector(
		(state) => state.cart,
	);
	const [triggerAdd] = useLazyAddCartItemQuery();
	const [triggerRemove] = useLazyRemoveCartItemQuery();
	const [triggerUpdate] = useLazyUpdateItemQuantityQuery();

	useGetCartItemsQuery(null);

	const updateItemQuantity = async (id: number, quantity: number) => {
		await triggerUpdate({ id, quantity }).unwrap();
	};

	const removeCartItem = async (id: number) => {
		await triggerRemove({ id }).unwrap();
	};

	const addCartItem = async (values: CreateCartItemValues) => {
		await triggerAdd({ values }).unwrap();
	};

	return {
		isLoading,
		totalAmount,
		items,
		updateItemQuantity,
		removeCartItem,
		addCartItem,
	};
};
