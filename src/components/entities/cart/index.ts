export { CartItem } from "./ui/CartItem";

export {
	useGetCartItemsQuery,
	useLazyAddCartItemQuery,
	useLazyRemoveCartItemQuery,
	useLazyUpdateItemQuantityQuery,
	cartsApi,
} from "./api/api";

import cartsReducer, { setItems, setTotalAmount } from "./model/slice";

export { cartsReducer, setItems, setTotalAmount };

export type { CreateCartItemValues } from "./model/types";
