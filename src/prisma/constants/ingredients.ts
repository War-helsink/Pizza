import type { Prisma } from "@prisma/client";

export const ingredients: Prisma.IngredientCreateManyInput[] = [
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
		price: 40,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
		price: 20,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
		price: 20,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
		price: 20,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
		price: 20,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
		price: 20,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
		price: 12,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
		price: 16,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
		price: 20,
	},
	{
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
		price: 20,
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const ingredientTranslations: Prisma.IngredientTranslationCreateManyInput[] =
	[
		{ locale: "en", name: "Cheese border", ingredientId: 1 },
		{ locale: "uk", name: "Сирний бортик", ingredientId: 1 },
		{ locale: "ru", name: "Сырный бортик", ingredientId: 1 },

		{ locale: "en", name: "Creamy mozzarella", ingredientId: 2 },
		{ locale: "uk", name: "Сливочна моцарелла", ingredientId: 2 },
		{ locale: "ru", name: "Сливочная моцарелла", ingredientId: 2 },

		{ locale: "en", name: "Cheddar and Parmesan cheese", ingredientId: 3 },
		{ locale: "uk", name: "Сири чеддер і пармезан", ingredientId: 3 },
		{ locale: "ru", name: "Сыры чеддер и пармезан", ingredientId: 3 },

		{ locale: "en", name: "Spicy jalapeño", ingredientId: 4 },
		{ locale: "uk", name: "Гострий перець халапеньо", ingredientId: 4 },
		{ locale: "ru", name: "Острый перец халапеньо", ingredientId: 4 },

		{ locale: "en", name: "Tender chicken", ingredientId: 5 },
		{ locale: "uk", name: "Ніжний ціпленок", ingredientId: 5 },
		{ locale: "ru", name: "Нежный цыпленок", ingredientId: 5 },

		{ locale: "en", name: "Champignons", ingredientId: 6 },
		{ locale: "uk", name: "Шампіньйони", ingredientId: 6 },
		{ locale: "ru", name: "Шампиньоны", ingredientId: 6 },

		{ locale: "en", name: "Ham", ingredientId: 7 },
		{ locale: "uk", name: "Ветчина", ingredientId: 7 },
		{ locale: "ru", name: "Ветчина", ingredientId: 7 },

		{ locale: "en", name: "Spicy pepperoni", ingredientId: 8 },
		{ locale: "uk", name: "Пікантна пепероні", ingredientId: 8 },
		{ locale: "ru", name: "Пикантная пепперони", ingredientId: 8 },

		{ locale: "en", name: "Spicy chorizo", ingredientId: 9 },
		{ locale: "uk", name: "Гостра чорізо", ingredientId: 9 },
		{ locale: "ru", name: "Острая чоризо", ingredientId: 9 },

		{ locale: "en", name: "Pickled cucumbers", ingredientId: 10 },
		{ locale: "uk", name: "Мариновані огірочки", ingredientId: 10 },
		{ locale: "ru", name: "Маринованные огурчики", ingredientId: 10 },

		{ locale: "en", name: "Fresh tomatoes", ingredientId: 11 },
		{ locale: "uk", name: "Свіжі томати", ingredientId: 11 },
		{ locale: "ru", name: "Свежие томаты", ingredientId: 11 },

		{ locale: "en", name: "Red onion", ingredientId: 12 },
		{ locale: "uk", name: "Червона цибуля", ingredientId: 12 },
		{ locale: "ru", name: "Красный лук", ingredientId: 12 },

		{ locale: "en", name: "Juicy pineapples", ingredientId: 13 },
		{ locale: "uk", name: "Соковиті ананаси", ingredientId: 13 },
		{ locale: "ru", name: "Сочные ананасы", ingredientId: 13 },

		{ locale: "en", name: "Italian herbs", ingredientId: 14 },
		{ locale: "uk", name: "Італійські трави", ingredientId: 14 },
		{ locale: "ru", name: "Итальянские травы", ingredientId: 14 },

		{ locale: "en", name: "Sweet pepper", ingredientId: 15 },
		{ locale: "uk", name: "Солодкий перець", ingredientId: 15 },
		{ locale: "ru", name: "Сладкий перец", ingredientId: 15 },

		{ locale: "en", name: "Feta cubes", ingredientId: 16 },
		{ locale: "uk", name: "Кубики бринзи", ingredientId: 16 },
		{ locale: "ru", name: "Кубики брынзы", ingredientId: 16 },

		{ locale: "en", name: "Ground beef", ingredientId: 17 },
		{ locale: "uk", name: "Яловичий фарш", ingredientId: 17 },
		{ locale: "ru", name: "Говяжий фарш", ingredientId: 17 },
	];
