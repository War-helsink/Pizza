import {
	categories,
	categoryTranslations,
	ingredients,
	ingredientTranslations,
	products,
	productTranslations,
	productItems,
} from "./constants";
import { prisma } from "./prisma-client";

async function up() {
	await prisma.category.createMany({
		data: categories,
	});

	await prisma.categoryTranslation.createMany({
		data: categoryTranslations,
	});

	await prisma.ingredient.createMany({
		data: ingredients,
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
				"/assets/pizza/11EE7D61304FAF5A98A6958F2BB2D260.webp",
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
				"/assets/pizza/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
			categoryId: 1,
			translations: {
				create: [
					{ locale: "en", name: "Four cheeses" },
					{ locale: "uk", name: "Чотири сири" },
					{ locale: "ru", name: "Четыре сыра" },
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
				"/assets/pizza/11EE7D61706D472F9A5D71EB94149304.webp",
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

	await prisma.story.createMany({
		data: [
			{
				previewImageUrl:
					"/assets/stories/1.webp",
			},
			{
				previewImageUrl:
					"/assets/stories/2.webp",
			},
			{
				previewImageUrl:
					"/assets/stories/3.webp",
			},
			{
				previewImageUrl:
					"/assets/stories/4.webp",
			},
			{
				previewImageUrl:
					"/assets/stories/5.webp",
			},
			{
				previewImageUrl:
					"/assets/stories/6.webp",
			},
		],
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl:
					"/assets/stories/oqx9feuljibke3mknab7ilb35t.webp",
			},
			{
				storyId: 1,
				sourceUrl:
					"/assets/stories/io7c5zarojdm7eus0trn7czdet.webp",
			},
			{
				storyId: 1,
				sourceUrl:
					"/assets/stories/zktyxdxnjqbzufonxd8ffk44cb.webp",
			},
			{
				storyId: 1,
				sourceUrl:
					"/assets/stories/9ufzwtpdjeekidqq04alfnxvu2.webp", 
			},
			{
				storyId: 1,
				sourceUrl:
					"/assets/stories/zktyxdxnjqbzufonxd8ffk44cb.webp",
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

	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductTranslation" RESTART IDENTITY CASCADE`;

	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;

	await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
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
