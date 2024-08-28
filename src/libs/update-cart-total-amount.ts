import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPricePrisma } from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
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
							product: true,
							prices: true,
						},
					},
					ingredients: {
						include: {
							prices: true,
						},
					},
				},
			},
		},
	});

	if (!userCart) {
		return;
	}

	const totalAmount = userCart.items.reduce((acc, item) => {
		return acc + calcCartItemTotalPricePrisma(item);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: "desc",
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});
};
