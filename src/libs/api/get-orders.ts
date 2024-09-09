import { prisma } from "@/prisma/prisma-client";

export const getOrders = async (
	userId: number,
	limit: number,
	offset: number,
) => {
	return await prisma.order.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		take: limit,
		skip: offset,
	});
};

export const getTotalOrdersCount = async (userId: number) => {
	return await prisma.order.count({
		where: { userId },
	});
};
