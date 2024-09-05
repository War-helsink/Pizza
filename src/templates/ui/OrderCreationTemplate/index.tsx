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

import { HeaderTemplate } from "../HeaderTemplate";

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
		<HeaderTemplate title={translation("template.title.orderCreation")} />
		<Preview>{translation("template.notification")}</Preview>
		<Body style={BodyStyle}>
			<Container style={ContainerStyle}>
				<Text>
					<h1>{translation("template.letter.orderCreation.title", { orderId })}</h1>

					<p>
						{translation("template.letter.orderCreation.message", {
							totalPrice,
							paymentUrl,
						})}
					</p>
				</Text>
				<div style={ButtonsStyle}>
					<Button href={`${VERCEL_URL}/`} style={ButtonStyle}>
						{translation("template.goToSite")}
					</Button>
				</div>
			</Container>
		</Body>
	</Html>
);

const BodyStyle: React.CSSProperties = {
	backgroundColor: "#f4f4f4",
	padding: "20px",
};
const ContainerStyle: React.CSSProperties = {
	maxWidth: "600px",
	margin: "0 auto",
	backgroundColor: "#ffffff",
	padding: "40px",
};

const ButtonsStyle: React.CSSProperties = {
	textAlign: "center",
	marginTop: "20px",
};

const ButtonStyle: React.CSSProperties = {
	padding: "10px 20px",
	backgroundColor: "#007bff",
	color: "#ffffff",
	textDecoration: "none",
	borderRadius: "5px",
};
