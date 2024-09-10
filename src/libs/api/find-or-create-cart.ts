import type { Locale } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string, locale: Locale) => {
	let userCart = await prisma.cart.findUnique({
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
	}

	return userCart;
};
