import type { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const products: Prisma.ProductCreateManyInput[] = [
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
		categoryId: 2,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
		categoryId: 2,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
		categoryId: 2,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
		categoryId: 3,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
		categoryId: 3,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
		categoryId: 3,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
		categoryId: 3,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
		categoryId: 3,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
		categoryId: 4,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
		categoryId: 4,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
		categoryId: 4,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
		categoryId: 4,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
		categoryId: 5,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
		categoryId: 5,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
		categoryId: 5,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
		categoryId: 5,
	},
	{
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
		categoryId: 5,
	},
];

export const productTranslations: Prisma.ProductTranslationCreateManyInput[] = [
	{ productId: 1, locale: "en", name: "Omelette with ham and mushrooms" },
	{ productId: 1, locale: "ru", name: "Омлет с ветчиной и грибами" },
	{ productId: 1, locale: "uk", name: "Омлет з шинкою та грибами" },

	{ productId: 2, locale: "en", name: "Omelette with pepperoni" },
	{ productId: 2, locale: "ru", name: "Омлет с пепперони" },
	{ productId: 2, locale: "uk", name: "Омлет з пепероні" },

	{ productId: 3, locale: "en", name: "Caffe Latte" },
	{ productId: 3, locale: "ru", name: "Кофе Латте" },
	{ productId: 3, locale: "uk", name: "Кава Латте" },

	{ productId: 4, locale: "en", name: "Denwich with ham and cheese" },
	{ productId: 4, locale: "ru", name: "Дэнвич ветчина и сыр" },
	{ productId: 4, locale: "uk", name: "Денвіч з шинкою та сиром" },

	{ productId: 5, locale: "en", name: "Chicken nuggets" },
	{ productId: 5, locale: "ru", name: "Куриные наггетсы" },
	{ productId: 5, locale: "uk", name: "Курячі нагетси" },

	{ productId: 6, locale: "en", name: "Baked potatoes with sauce 🌱" },
	{ productId: 6, locale: "ru", name: "Картофель из печи с соусом 🌱" },
	{ productId: 6, locale: "uk", name: "Запечена картопля з соусом 🌱" },

	{ productId: 7, locale: "en", name: "Dodster" },
	{ productId: 7, locale: "ru", name: "Додстер" },
	{ productId: 7, locale: "uk", name: "Додстер" },

	{ productId: 8, locale: "en", name: "Spicy Dodster 🌶️🌶️" },
	{ productId: 8, locale: "ru", name: "Острый Додстер 🌶️🌶️" },
	{ productId: 8, locale: "uk", name: "Гострий Додстер 🌶️🌶️" },

	{ productId: 9, locale: "en", name: "Banana milkshake" },
	{ productId: 9, locale: "ru", name: "Банановый молочный коктейль" },
	{ productId: 9, locale: "uk", name: "Банановий молочний коктейль" },

	{ productId: 10, locale: "en", name: "Caramel apple milkshake" },
	{ productId: 10, locale: "ru", name: "Карамельное яблоко молочный коктейль" },
	{ productId: 10, locale: "uk", name: "Карамельне яблуко молочний коктейль" },

	{ productId: 11, locale: "en", name: "Oreo cookie milkshake" },
	{ productId: 11, locale: "ru", name: "Молочный коктейль с печеньем Орео" },
	{ productId: 11, locale: "uk", name: "Молочний коктейль з печивом Орео" },

	{ productId: 12, locale: "en", name: "Classic milkshake 👶" },
	{ productId: 12, locale: "ru", name: "Классический молочный коктейль 👶" },
	{ productId: 12, locale: "uk", name: "Класичний молочний коктейль 👶" },

	{ productId: 13, locale: "en", name: "Irish Cappuccino" },
	{ productId: 13, locale: "ru", name: "Ирландский Капучино" },
	{ productId: 13, locale: "uk", name: "Ірландський Капучино" },

	{ productId: 14, locale: "en", name: "Caramel Cappuccino" },
	{ productId: 14, locale: "ru", name: "Кофе Карамельный капучино" },
	{ productId: 14, locale: "uk", name: "Кава Карамельний капучино" },

	{ productId: 15, locale: "en", name: "Coconut Latte" },
	{ productId: 15, locale: "ru", name: "Кофе Кокосовый латте" },
	{ productId: 15, locale: "uk", name: "Кава Кокосовий латте" },

	{ productId: 16, locale: "en", name: "Americano" },
	{ productId: 16, locale: "ru", name: "Кофе Американо" },
	{ productId: 16, locale: "uk", name: "Кава Американо" },

	{ productId: 17, locale: "en", name: "Caffe Latte" },
	{ productId: 17, locale: "ru", name: "Кофе Латте" },
	{ productId: 17, locale: "uk", name: "Кава Латте" },
];

export const productItems: Prisma.ProductItemCreateManyInput[] = [
	{ productId: 1 },
	{ productId: 2 },
	{ productId: 3 },
	{ productId: 4 },
	{ productId: 5 },
	{ productId: 6 },
	{ productId: 7 },
	{ productId: 8 },
	{ productId: 9 },
	{ productId: 10 },
	{ productId: 11 },
	{ productId: 12 },
	{ productId: 13 },
	{ productId: 14 },
	{ productId: 15 },
	{ productId: 16 },
	{ productId: 17 },

	{ productId: 18, pizzaType: 1, size: 20 },
	{ productId: 18, pizzaType: 2, size: 30 },
	{ productId: 18, pizzaType: 2, size: 40 },

	{ productId: 19, pizzaType: 1, size: 20 },
	{ productId: 19, pizzaType: 1, size: 30 },
	{ productId: 19, pizzaType: 1, size: 40 },
	{ productId: 19, pizzaType: 2, size: 20 },
	{ productId: 19, pizzaType: 2, size: 30 },
	{ productId: 19, pizzaType: 2, size: 40 },

	{ productId: 20, pizzaType: 1, size: 20 },
	{ productId: 20, pizzaType: 2, size: 30 },
	{ productId: 20, pizzaType: 2, size: 40 },
];

export const productItemPrices: Prisma.ProductItemPriceCreateManyInput[] = [
	{ productItemId: 1, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 1, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 1, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 2, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 2, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 2, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 3, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 3, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 3, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 4, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 4, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 4, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 5, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 5, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 5, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 6, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 6, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 6, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 7, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 7, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 7, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 8, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 8, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 8, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 9, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 9, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 9, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 10, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 10, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 10, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 11, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 11, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 11, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 12, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 12, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 12, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 13, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 13, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 13, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 14, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 14, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 14, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 15, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 15, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 15, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 16, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 16, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 16, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 17, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 17, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 17, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 18, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 18, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 18, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 19, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 19, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 19, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 20, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 20, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 20, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 21, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 21, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 21, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 22, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 22, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 22, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 23, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 23, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 23, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 24, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 24, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 24, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 25, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 25, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 25, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 26, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 26, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 26, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 27, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 27, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 27, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 28, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 28, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 28, locale: "uk", price: randomDecimalNumber(190, 600) },

	{ productItemId: 29, locale: "en", price: randomDecimalNumber(190, 600) },
	{ productItemId: 29, locale: "ru", price: randomDecimalNumber(190, 600) },
	{ productItemId: 29, locale: "uk", price: randomDecimalNumber(190, 600) },
];
