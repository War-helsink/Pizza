import type { Locale } from "@/@types/prisma";
import type { TFunction } from "i18next";
import {
	Html,
	Preview,
	Body,
	Container,
	Text,
	Button,
} from "@react-email/components";

import { Header } from "../Header";

export interface OrderCreationTemplateProps {
	translation: TFunction;
	lang: Locale;
	orderId: number;
	totalPrice: number;
	paymentUrl?: string;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const OrderCreationTemplate: React.FC<OrderCreationTemplateProps> = ({
	lang,
	orderId,
	totalPrice,
	paymentUrl,
	translation,
}) => (
	<Html lang={lang}>
		<Header title={translation("template.title.orderCreation")} />
		<Preview>{translation("template.notification")}</Preview>
		<Body style={{ backgroundColor: "#f4f4f4", padding: "20px" }}>
			<Container
				style={{
					maxWidth: "600px",
					margin: "0 auto",
					backgroundColor: "#ffffff",
					padding: "40px",
				}}
			>
				<Text>
					<h1>{translation("template.payOrderTitle", { orderId })}</h1>

					<p>
						{translation("template.payOrderMessage", {
							totalPrice,
							paymentUrl,
						})}
					</p>
				</Text>
				<div style={{ textAlign: "center", marginTop: "20px" }}>
					<Button
						href={`${VERCEL_URL}/`}
						style={{
							padding: "10px 20px",
							backgroundColor: "#007bff",
							color: "#ffffff",
							textDecoration: "none",
							borderRadius: "5px",
						}}
					>
						{translation("template.goToSite")}
					</Button>
				</div>
			</Container>
		</Body>
	</Html>
);
