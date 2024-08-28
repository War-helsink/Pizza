import type {
	Cart as CartBase,
	CartItem as CartItemBase,
} from "@prisma/client";

import type { Ingredient } from "./ingredient";
import type { ProductItem } from "./product";

export interface CartWithItems extends CartBase {
	items: CartItem[];
}

export type Cart = CartBase | CartWithItems;

export interface CartItemtWithProductItem extends CartItemBase {
	productItem: ProductItem;
}

export interface CartItemtWithIngredients extends CartItemBase {
	ingredients: Ingredient[];
}

export type CartItem =
	| CartItemBase
	| CartItemtWithProductItem
	| CartItemtWithIngredients
	| (CartItemtWithProductItem & CartItemtWithIngredients);
