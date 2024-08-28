import type { CartPrisma, CartItemPrisma } from "@/@types/prisma";
import type { Cart, CartItem } from "@/@types/entities";

import { ingredientsConvert } from "./ingredients";
import { productItemConvert } from "./products";

export const cartsConvert: (carts: CartPrisma[]) => Cart[] = (carts) => {
	return carts.map((cart) => cartConvert(cart));
};

export const cartConvert: (cart: CartPrisma) => Cart = (cart) => {
	const { items, ...args } = cart;

	return {
		items: items ? cartItemsConvert(items) : undefined,
		...args,
	};
};

export const cartItemsConvert: (cartItems: CartItemPrisma[]) => CartItem[] = (
	cartItems,
) => {
	return cartItems.map((cartItem) => cartItemConvert(cartItem));
};

export const cartItemConvert: (cartItem: CartItemPrisma) => CartItem = (
	cartItem,
) => {
	const { ingredients, productItem, ...args } = cartItem;

	return {
		productItem: productItem ? productItemConvert(productItem) : undefined,
		ingredients: ingredients ? ingredientsConvert(ingredients) : undefined,
		...args,
	};
};
