import type { TFunction } from "i18next";

export interface PayOrderTemplateProps {
	translation: TFunction;
	orderId: number;
	totalPrice: number;
	paymentUrl?: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({
	orderId,
	totalPrice,
	paymentUrl,
	translation
}) => (
	<div>
		<h1>{translation("template.payOrderTitle", { orderId })}</h1>

		<p dangerouslySetInnerHTML={{
			__html: translation("template.payOrderMessage", {
				totalPrice,
				paymentUrl
			})
		}} />
	</div>
);
