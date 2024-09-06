import type { Locale } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

export const getCartId = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	});

	return userCart ? userCart.id : -1;
};

export const getCart = async (token: string, locale: Locale) => {
	return await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			items: {
				orderBy: {
					createdAt: "desc",
				},
				include: {
					productItem: {
						include: {
							product: {
								include: {
									translations: {
										where: {
											locale: locale,
										},
										select: {
											name: true,
										},
									},
								},
							},
						},
					},
					ingredients: {
						include: {
							translations: {
								where: {
									locale: locale,
								},
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	});
};
