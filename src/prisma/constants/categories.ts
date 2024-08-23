import type { Prisma } from "@prisma/client";

export const categories: Prisma.CategoryCreateInput[] = [
	{
		key: "pizza",
	},
	{
		key: "combo",
	},
	{
		key: "appetizers",
	},
	{
		key: "cocktails",
	},
	{
		key: "drinks",
	},
];

export const categoryTranslations: Prisma.CategoryTranslationCreateManyInput[] =
	[
		{ categoryId: 1, locale: "en", name: "Pizzas" },
		{ categoryId: 1, locale: "ru", name: "Чорізо Фреш" },
		{ categoryId: 1, locale: "uk", name: "Піци" },

		{ categoryId: 2, locale: "en", name: "Combos" },
		{ categoryId: 2, locale: "ru", name: "Комбо" },
		{ categoryId: 2, locale: "uk", name: "Комбо" },

		{ categoryId: 3, locale: "en", name: "Appetizers" },
		{ categoryId: 3, locale: "ru", name: "Закуски" },
		{ categoryId: 3, locale: "uk", name: "Закуски" },

		{ categoryId: 4, locale: "en", name: "Cocktails" },
		{ categoryId: 4, locale: "ru", name: "Коктейли" },
		{ categoryId: 4, locale: "uk", name: "Коктейлі" },

		{ categoryId: 5, locale: "en", name: "Drinks" },
		{ categoryId: 5, locale: "ru", name: "Напитки" },
		{ categoryId: 5, locale: "uk", name: "Напої" },
	];
