import Link from "next/link";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/shared/ui";
import { formatDate } from "@/libs/helpers";
import { getOrders, getTotalOrdersCount } from "@/libs/api";

import type { ProfileOrderHistoryProps } from "../../model/props";

export const ProfileOrderHistory: React.FC<ProfileOrderHistoryProps> = async ({
	translation,
	userId,
	page,
}) => {
	const currentPage = page ? Number(page) : 1;
	const ordersPerPage = 10;
	const offset = (currentPage - 1) * ordersPerPage;

	const orders = await getOrders(userId, ordersPerPage, offset);
	const totalOrders = await getTotalOrdersCount(userId);
	const totalPages = Math.ceil(totalOrders / ordersPerPage);

	return (
		<Table>
			<TableCaption>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href={
									currentPage === 1
										? undefined
										: `/profile/order-history?page=${currentPage - 1}`
								}
								text={translation("profile.order-history.caption.previous")}
							/>
						</PaginationItem>

						{currentPage - 3 > 1 && (
							<PaginationItem>
								<PaginationLink href="/profile/order-history?page=1">
									1
								</PaginationLink>
							</PaginationItem>
						)}

						{currentPage - 3 > 2 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						{[...Array(totalPages)].map((_, index) => {
							if (currentPage + 3 < index + 1) {
								return null;
							}

							if (currentPage - 3 > index + 1) {
								return null;
							}

							return (
								<PaginationItem key={index}>
									<PaginationLink
										isActive={currentPage === index + 1}
										href={`/profile/order-history?page=${index + 1}`}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							);
						})}

						{currentPage + 3 < totalPages - 1 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						{currentPage + 3 < totalPages && (
							<PaginationItem>
								<PaginationLink
									href={`/profile/order-history?page=${totalPages}`}
								>
									{totalPages}
								</PaginationLink>
							</PaginationItem>
						)}
						<PaginationItem>
							<PaginationNext
								href={
									currentPage === totalPages
										? undefined
										: `/profile/order-history?page=${currentPage + 1}`
								}
								text={translation("profile.order-history.caption.next")}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>{translation("profile.order-history.date")}</TableHead>
					<TableHead>
						{translation("profile.order-history.orderNumber")}
					</TableHead>
					<TableHead>{translation("profile.order-history.status")}</TableHead>
					<TableHead>{translation("profile.order-history.total")}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.id}>
						<TableCell className="font-medium">
							{formatDate(order.createdAt)}
						</TableCell>
						<TableCell className="text-primary underline">
							<Link href={`/profile/order-history/${order.id}`}>
								{order.id}
							</Link>
						</TableCell>
						<TableCell>{order.status}</TableCell>
						<TableCell>{`${translation("product.currency")} ${order.totalPrice}`}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
