import type { Order, Locale } from "@prisma/client";
import type { TFunction } from "i18next";
import type { CartItemPrisma } from "@/@types/prisma";

import {
	Section,
	Heading,
	Link,
	Hr,
	Text,
	Button,
	Column,
	Img,
	Row,
} from "@react-email/components";
import { formatDate } from "@/libs/helpers";
import { calcCartItemTotalPrice } from "@/libs/calc-cart-item-total-price";

import { MainTemplate } from "../MainTemplate";

export interface OrderCreationTemplateProps {
	translation: TFunction;
	items: CartItemPrisma[];
	lang: Locale;
	order: Order;
	totalPrice: number;
	isAuthenticated?: boolean;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const OrderCreationTemplate: React.FC<OrderCreationTemplateProps> = ({
	lang,
	items,
	order,
	totalPrice,
	translation,
	isAuthenticated = false,
}) => {
	const orderInfos = [
		{
			label: translation("profile.order.data"),
			value: formatDate(order.createdAt),
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
	];

	return (
		<MainTemplate
			lang={lang}
			styleContainer={{ width: 660, maxWidth: "100%" }}
			translation={translation}
			textHeader={translation("template.title.orderCreation")}
			textPreview={translation("template.notification")}
		>
			<Section style={global.defaultPadding}>
				<Heading style={h1}>
					{translation("template.letter.orderCreation.title", {
						orderId: order.id,
					})}
				</Heading>
				<Hr style={global.hr} />
				<Section>
					{orderInfos.map((info, index) => (
						<Row key={index} style={{ display: "inline-flex" }}>
							<Column style={columnText}>{info.label}</Column>
							<Column>{info.value}</Column>
						</Row>
					))}
				</Section>
				<Hr style={global.hr} />
				<Section>
					{items.map((item) => (
						<Row key={item.productItem.product?.id}>
							<Column style={{ width: "64px" }}>
								<Img
									src={item.productItem.product?.imageUrl}
									width="64px"
									height="64px"
									style={productIcon}
								/>
							</Column>

							<Column style={{ paddingLeft: "22px", verticalAlign: "middle" }}>
								<Link
									href={`${VERCEL_URL}/product/${item.productItem.product?.id}`}
									style={{
										color: "#212121",
										verticalAlign: "center",
										textDecoration: "underline",
									}}
								>
									{item.productItem.product?.translations
										? item.productItem.product.translations.find(
												(item) => item.locale === lang,
											)?.name
										: null}
								</Link>
							</Column>
							<Column
								style={{
									verticalAlign: "middle",
									paddingLeft: "12px",
									width: "70px",
								}}
							>
								<Text style={{ margin: "0" }}>{item.quantity}</Text>
							</Column>
							<Column
								style={{
									verticalAlign: "middle",
									paddingLeft: "12px",
									width: "70px",
								}}
								align="right"
							>
								<Text
									style={{ margin: "0", lineHeight: "2", fontWeight: "500" }}
								>
									{`${translation("product.currency")} ${calcCartItemTotalPrice(item as any)}`}
								</Text>
							</Column>
						</Row>
					))}
				</Section>
				<Hr style={{ ...hrTotal, marginTop: "20px" }} />
				<Section align="right">
					<Row>
						<Column style={tableCell} align="right">
							<Text style={productPriceTotal}>
								{translation("template.letter.orderCreation.total")}
							</Text>
						</Column>
						<Column style={productPriceVerticalLine} />
						<Column style={productPriceLargeWrapper}>
							<Text
								style={productPriceLarge}
							>{`${translation("product.currency")} ${totalPrice}`}</Text>
						</Column>
					</Row>
				</Section>
				<Hr style={{ ...hrTotal, marginBottom: "20px" }} />
				<Section>
					<div style={buttons}>
						<Button
							href={
								isAuthenticated
									? `${VERCEL_URL}/profile/order-history/${order.id}`
									: `${VERCEL_URL}/`
							}
							style={button}
						>
							{translation("template.goToSite")}
						</Button>
					</div>
				</Section>
			</Section>
		</MainTemplate>
	);
};

const paddingX = {
	paddingLeft: "40px",
	paddingRight: "40px",
};

const paddingY = {
	paddingTop: "22px",
	paddingBottom: "22px",
};

const global = {
	defaultPadding: {
		...paddingX,
		...paddingY,
	},
	text: {
		margin: "0",
		lineHeight: "2",
		color: "#747474",
		fontWeight: "500",
	},
	hr: {
		borderColor: "#e6ebf1",
		margin: "20px 0",
	},
};

const h1 = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "20px",
	fontWeight: "bold",
	textAlign: "center" as const,
	marginBottom: "15px",
};

const tableCell = { display: "table-cell" };

const hrTotal = {
	borderColor: "#e6ebf1",
	margin: "0px",
};

const productPriceTotal = {
	margin: "0",
	color: "rgb(102,102,102)",
	fontSize: "10px",
	fontWeight: "600",
	padding: "0px 30px 0px 0px",
	textAlign: "right" as const,
};

const productPriceVerticalLine = {
	height: "48px",
	borderLeft: "1px solid",
	borderColor: "rgb(238,238,238)",
};

const productPriceLarge = {
	margin: "0px 20px 0px 0px",
	fontSize: "16px",
	fontWeight: "600",
	whiteSpace: "nowrap" as const,
	textAlign: "right" as const,
};
const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const columnText = {
	width: 180,
	opacity: 0.5,
};

const productIcon = {
	margin: "0 0 0 20px",
	borderRadius: "14px",
	border: "1px solid rgba(128,128,128,0.2)",
};

const buttons = {
	textAlign: "center" as const,
	marginTop: "20px",
};

const button = {
	padding: "10px 20px",
	backgroundColor: "#007bff",
	color: "#ffffff",
	textDecoration: "none",
	borderRadius: "5px",
};
