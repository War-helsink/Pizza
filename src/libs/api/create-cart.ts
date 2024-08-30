import { prisma } from "@/prisma/prisma-client";

export const createCart = async (token: string) => {
	const userCart = await prisma.cart.create({
		data: {
			token,
		},
	});

	return userCart.id;
};
