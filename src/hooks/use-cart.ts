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
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
	const { items, totalAmount } = useAppSelector((state) => state.cart);
	const [triggerAdd, { isLoading: isLoadingAdd }] = useLazyAddCartItemQuery();
	const [triggerRemove, { isLoading: isLoadingRemove }] =
		useLazyRemoveCartItemQuery();
	const [triggerUpdate, { isLoading: isLoadingUpdate }] =
		useLazyUpdateItemQuantityQuery();

	const { isLoading: isLoadingGet } = useGetCartItemsQuery(null);

	const updateItemQuantity = (id: number, quantity: number) => {
		triggerUpdate({ id, quantity });
	};

	const removeCartItem = (id: number) => {
		triggerRemove({ id });
	};

	const addCartItem = (values: CreateCartItemValues) => {
		triggerAdd({ values });
	};

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
