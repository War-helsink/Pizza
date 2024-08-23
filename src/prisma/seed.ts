import {
	categories,
	categoryTranslations,
	ingredients,
	ingredientPrices,
	ingredientTranslations,
	products,
	productTranslations,
	productItems,
	productItemPrices,
} from "./constants";
import { prisma } from "../libs/prisma";
import { hashSync } from "bcrypt";

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: "User Test",
				email: "user@test.ru",
				password: hashSync("111111", 10),
				verified: new Date(),
				role: "USER",
			},
			{
				fullName: "Admin Admin",
				email: "admin@test.ru",
				password: hashSync("111111", 10),
				verified: new Date(),
				role: "ADMIN",
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.categoryTranslation.createMany({
		data: categoryTranslations,
	});

	await prisma.ingredient.createMany({
		data: ingredients,
	});

	await prisma.ingredientPrice.createMany({
		data: ingredientPrices,
	});

	await prisma.ingredientTranslation.createMany({
		data: ingredientTranslations,
	});

	await prisma.product.createMany({
		data: products,
	});

	await prisma.productTranslation.createMany({
		data: productTranslations,
	});

	await prisma.product.create({
		data: {
			imageUrl:
				"https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
			categoryId: 1,
			translations: {
				create: [
					{ locale: "en", name: "Pepperoni fresh" },
					{ locale: "uk", name: "Пепероні фреш" },
					{ locale: "ru", name: "Пепперони фреш" },
				],
			},
			ingredients: {
				connect: ingredients.slice(0, 5) as any,
			},
		},
	});

	await prisma.product.create({
		data: {
			imageUrl:
				"https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
			categoryId: 1,
			translations: {
				create: [
					{ locale: "en", name: "Cheese" },
					{ locale: "uk", name: "Сирна" },
					{ locale: "ru", name: "Сырная" },
				],
			},
			ingredients: {
				connect: ingredients.slice(5, 10) as any,
			},
		},
	});

	await prisma.product.create({
		data: {
			imageUrl:
				"https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
			categoryId: 1,
			translations: {
				create: [
					{ locale: "en", name: "Chorizo fresh" },
					{ locale: "uk", name: "Чорізо фреш" },
					{ locale: "ru", name: "Чоризо фреш" },
				],
			},
			ingredients: {
				connect: ingredients.slice(10, 40) as any,
			},
		},
	});

	await prisma.productItem.createMany({
		data: productItems,
	});

	await prisma.productItemPrice.createMany({
		data: productItemPrices,
	});

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: "11111",
			},
			{
				userId: 2,
				totalAmount: 0,
				token: "222222",
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	});

	await prisma.story.createMany({
		data: [
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
			},
		],
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl:
					"https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl:
					"https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl:
					"https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl:
					"https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl:
					"https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
			},
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CategoryTranslation" RESTART IDENTITY CASCADE`;

	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;

	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "IngredientTranslation" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "IngredientPrice" RESTART IDENTITY CASCADE`;

	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductTranslation" RESTART IDENTITY CASCADE`;

	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItemPrice" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
