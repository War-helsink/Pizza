import type { Locale } from "@/@types/prisma";
import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string, locale: Locale) => {
	let userCart = await prisma.cart.findFirst({
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
							prices: {
								where: {
									locale: locale,
								},
								select: {
									price: true,
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
							prices: {
								where: {
									locale: locale,
								},
								select: {
									price: true,
								},
							},
						},
					},
				},
			},
		},
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
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
								prices: {
									where: {
										locale: locale,
									},
									select: {
										price: true,
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
								prices: {
									where: {
										locale: locale,
									},
									select: {
										price: true,
									},
								},
							},
						},
					},
				},
			},
		});
	}

	return userCart;
};
