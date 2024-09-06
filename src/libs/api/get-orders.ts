import { prisma } from "@/prisma/prisma-client";

export const getOrders = async (userId: number) => {
	return await prisma.order.findFirst({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
