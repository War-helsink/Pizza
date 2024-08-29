import type {
	Cart as CartBase,
	CartItem as CartItemBase,
} from "@prisma/client";

import type { Ingredient } from "./ingredient";
import type { ProductItem } from "./product";

export interface Cart extends CartBase {
	items: CartItem[];
}

export interface CartItem extends CartItemBase {
	productItem: ProductItem<"full">;

	ingredients: Ingredient[];
}
