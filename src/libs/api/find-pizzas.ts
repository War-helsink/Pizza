import { prisma } from "@/prisma/prisma-client";
import type { Locale } from "@prisma/client";
import { categoriesConvert } from "@/prisma/convert";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams, locale: Locale) => {
	const sizes = params.sizes?.split(",").map(Number);
	const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
	const ingredientsIdArr = params.ingredients?.split(",").map(Number);

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			translations: {
				where: {
					locale,
				},
				select: {
					name: true,
				},
			},
			products: {
				orderBy: {
					id: "desc",
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
							}
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},

				include: {
					ingredients: {
						include: {
							translations: {
								where: {
									locale,
								},
								select: {
									name: true,
								},
							},
						},
					},

					translations: {
						where: {
							locale,
						},
						select: {
							name: true,
						},
					},

					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: "asc",
						},
					},
				},
			},
		},
	});

	return categoriesConvert(
		categories.filter((category) => category.products.length > 0),
	);
};
