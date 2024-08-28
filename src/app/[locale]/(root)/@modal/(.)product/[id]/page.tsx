import { notFound } from "next/navigation";
import type { Locale } from "@/@types/prisma";

import { prisma } from "@/prisma/prisma-client";
import { productConvert } from "@/prisma/convert";
import { ChooseProductModal } from "@/components/features/products";

export default async function ProductModalPage({
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

	return <ChooseProductModal product={productConvert(product)} />;
}