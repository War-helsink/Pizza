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
import { getOrders } from "@/libs/api";

import type { ProfileOrderHistoryProps } from "../../model/props";

export const ProfileOrderHistory: React.FC<ProfileOrderHistoryProps> = async ({
	translation,
	userId,
}) => {
	const orders = await getOrders(userId);

	return (
		<Table>
			<TableCaption>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								text={translation("profile.order-history.caption.previous")}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink>1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink isActive>2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink>3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
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
