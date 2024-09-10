import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shared/ui";
import { formatDate } from "@/libs/helpers";
import { calcCartItemTotalPrice } from "@/libs/calc-cart-item-total-price";
import type { ProfileOrderProps } from "../../model/props";

export const ProfileOrder: React.FC<ProfileOrderProps> = ({
	translation,
	locale,
	order,
}) => {
	const orderInfos = [
		{
			label: translation("profile.order.data"),
			value: formatDate(order.createdAt),
		},
		{
			label: translation("profile.order.amountAndStatus"),
			value: `${translation("product.currency")} ${order.totalPrice} ${order.status}`,
		},
		{
			label: translation("profile.order.delivery.method"),
			value: translation("profile.order.delivery.NovaPoshta"),
		},
		{
			label: translation("profile.order.address"),
			value: order.address,
		},
		{
			label: translation("profile.order.recipient"),
			value: order.fullName,
		},
		{
			label: translation("profile.order.email"),
			value: order.email,
		},
	];

	return (
		<>
			<div className="text-xl font-semibold">
				{translation("profile.order.title")}
			</div>
			<div className="border-t border-b py-4 text-sm">
				{orderInfos.map((info, index) => (
					<div key={index} className="flex items-center py-3">
						<div className="min-w-52 opacity-50">{info.label}</div>
						<div className="">{info.value}</div>
					</div>
				))}
			</div>
			<div className="text-xl font-semibold">
				{translation("profile.order.composition")}
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>{translation("profile.order.table.name")}</TableHead>
						<TableHead>{translation("profile.order.table.quantity")}</TableHead>
						<TableHead className="text-right">
							{translation("profile.order.table.price")}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{(order.items as any[]).map((item) => (
						<TableRow key={item.productItem.product.id}>
							<TableCell>
								<Link
									href={`/product/${item.productItem.product.id}`}
									className="w-fit flex items-center gap-2 text-lg underline hover:text-primary"
								>
									<img
										className="w-[60px] h-[60px]"
										src={item.productItem.product.imageUrl}
										loading="lazy"
										alt=""
									/>
									{
										item.productItem.product.translations.find(
											(item: any) => item.locale === locale,
										).name
									}
								</Link>
							</TableCell>
							<TableCell>{item.quantity}</TableCell>
							<TableCell className="text-right">
								{`${translation("product.currency")} ${calcCartItemTotalPrice(item)}`}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={4} className="text-right">
							{translation("profile.order.table.summary", {
								totalPrice: order.totalPrice,
							})}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
};
