export type { CartItemProps } from "./model/props"
export { CartItem } from "./ui/CartItem";

export {
	useGetCartItemsQuery,
	useLazyAddCartItemQuery,
	useLazyRemoveCartItemQuery,
	useLazyUpdateItemQuantityQuery,
	cartsApi,
} from "./api/api";

import cartsReducer, {
	setAll,
	setItems,
	setLoading,
	setTotalAmount,
} from "./model/slice";

export { cartsReducer, setAll, setItems, setLoading, setTotalAmount };

export type { CreateCartItemValues } from "./model/types";
