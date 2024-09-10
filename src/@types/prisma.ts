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
	Locale,
} from "@prisma/client";

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
	locale: Locale;
}

export interface ProductItemPrisma extends ProductItem {
	product?: ProductPrisma;
}

export interface IngredientPrisma extends Ingredient {
	translations?: IngredientTranslationPrisma[];
}

export interface IngredientTranslationPrisma {
	name: string;
	locale: Locale;
}

export interface CartPrisma extends Cart {
	items?: CartItemPrisma[];
}

export interface CartItemPrisma extends CartItem {
	ingredients?: IngredientPrisma[];
	productItem: ProductItemPrisma;
}
