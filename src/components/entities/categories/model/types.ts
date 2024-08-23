export interface CategoryResponse {
	id: number;
	key: string;
	translations: CategoryTranslations[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Category {
	id: number;
	key: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CategoryTranslations {
	locale: Locale;
	name: string;
	categoryId: number;
}

export enum Locale {
	ru = "ru",
	uk = "uk",
	en = "en",
}
