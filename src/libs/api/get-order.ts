import { prisma } from "@/prisma/prisma-client";

export const getOrder = async (orderId: number, userId: number) => {
	return await prisma.order.findUnique({
		where: {
			id: orderId,
			userId
		},
	});
};
