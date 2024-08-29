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
	const { items, totalAmount } = useAppSelector((state) => state.cart);
	const [triggerAdd, { isLoading: isLoadingAdd }] = useLazyAddCartItemQuery();
	const [triggerRemove, { isLoading: isLoadingRemove }] =
		useLazyRemoveCartItemQuery();
	const [triggerUpdate, { isLoading: isLoadingUpdate }] =
		useLazyUpdateItemQuantityQuery();

	const { isLoading: isLoadingGet } = useGetCartItemsQuery(null);

	const updateItemQuantity = async (id: number, quantity: number) => {
		await triggerUpdate({ id, quantity }).unwrap();
	};

	const removeCartItem = async (id: number) => {
		await triggerRemove({ id }).unwrap();
	};

	const addCartItem = async (values: CreateCartItemValues) => {
		await triggerAdd({ values }).unwrap();
	};

	console.log(
		"isLoading",
		isLoadingGet || isLoadingAdd || isLoadingUpdate || isLoadingRemove,
	);

	return {
		isLoading:
			isLoadingGet || isLoadingAdd || isLoadingUpdate || isLoadingRemove,
		totalAmount,
		items,
		updateItemQuantity,
		removeCartItem,
		addCartItem,
	};
};
