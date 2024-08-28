import type {
	User,
	Category,
	Product,
	ProductItem,
	Ingredient,
	Cart,
	CartItem,
	Order,
	VerificationCode,
} from "@prisma/client";
import type { $Enums } from "@prisma/client";

export interface UserPrisma extends User {
	cart?: CartPrisma;
	orders?: Order[];
	verificationCode?: VerificationCode;
}

export interface CategoryPrisma extends Category {
	products?: ProductPrisma[];
	translations?: CategoryTranslationPrisma[];
}

export interface CategoryTranslationPrisma {
	name: string;
}

export interface ProductPrisma extends Product {
	translations?: ProductTranslationPrisma[];
	ingredients?: IngredientPrisma[];
	items?: ProductItemPrisma[];
}

export interface ProductTranslationPrisma {
	name: string;
}

export interface ProductItemPrisma extends ProductItem {
	product?: ProductPrisma;
	prices?: ProductItemPricePrisma[];
}

export interface ProductItemPricePrisma {
	price: number;
}

export interface IngredientPrisma extends Ingredient {
	translations?: IngredientTranslationPrisma[];
	prices?: IngredientPricePrisma[];
}

export interface IngredientTranslationPrisma {
	name: string;
}

export interface IngredientPricePrisma {
	price: number;
}

export interface CartPrisma extends Cart {
	items?: CartItemPrisma[];
}

export interface CartItemPrisma extends CartItem {
	ingredients?: IngredientPrisma[];
	productItem?: ProductItemPrisma;
}

export type Locale = $Enums.Locale;
export type UserRole = $Enums.UserRole;
export type OrderStatus = $Enums.OrderStatus;
