import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shared/ui";
import { getOrders } from "@/libs/api";

import type { ProfileOrderProps } from "../../model/props";

export const ProfileOrder: React.FC<ProfileOrderProps> = async ({ userId }) => {
	const orders = await getOrders(userId);
	console.log(orders);

	return (
		<Table>
			<TableCaption>Список ваших последних счетов.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Дата оформления</TableHead>
					<TableHead>Номер заказа</TableHead>
					<TableHead>Статус</TableHead>
					<TableHead>Сумма заказа</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{/* {invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell>{invoice.totalAmount}</TableCell>
					</TableRow>
				))} */}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell>$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
