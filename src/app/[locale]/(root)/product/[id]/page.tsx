import type { Metadata } from "next";
import initTranslations from "@/libs/i18n";
import type { Locale } from "@/@types/prisma";

import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { productConvert } from "@/prisma/convert";
import { ProductForm } from "@/components/entities/products";
import { Container } from "@/components/shared/ui";

export async function generateMetadata({
	params: { id, locale },
}: { params: { id: string; locale: Locale } }): Promise<Metadata> {
	const { t } = await initTranslations({ locale });

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			translations: {
				where: {
					locale: locale,
				},
			},
			items: {
				take: 1,
			},
		},
	});

	const firstItem = product?.items[0];
	const isPizzaForm = Boolean(firstItem?.pizzaType);

	return {
		title: isPizzaForm
			? t("metadata:title.pizza", {
					productName: product?.translations[0].name,
				})
			: t("metadata:title.product", {
					productName: product?.translations[0].name,
				}),
		description: isPizzaForm
			? t("metadata:description.pizza", {
					productName: product?.translations[0].name,
				})
			: t("metadata:description.product", {
					productName: product?.translations[0].name,
				}),
	};
}

export default async function ProductPage({
	params: { id, locale },
}: { params: { id: string; locale: Locale } }) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			translations: {
				where: {
					locale: locale,
				},
			},
			ingredients: {
				include: {
					translations: {
						where: {
							locale: locale,
						},
					},
					prices: {
						where: {
							locale: locale,
						},
					},
				},
			},
			items: {
				include: {
					prices: {
						where: {
							locale: locale,
						},
					},
				},
			},
		},
	});

	if (!product) {
		return notFound();
	}

	const isPizza = Boolean(product.items[0].pizzaType);

	return (
		<Container className="flex flex-col my-10">
			<ProductForm isPizza={isPizza} product={productConvert(product)} />
		</Container>
	);
}
