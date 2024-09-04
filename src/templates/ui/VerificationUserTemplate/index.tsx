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

export interface VerificationUserTemplateProps {
	lang: Locale;
	code: string;
	translation: TFunction;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const VerificationUserTemplate: React.FC<
	VerificationUserTemplateProps
> = ({ code, translation, lang }) => {
	return (
		<Html lang={lang}>
			<Header title={translation("template.title.verificationUser")}  />
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
						<p>
							{translation("template.verificationCode")} <h2>{code}</h2>
						</p>

						<p>
							<a href={`${VERCEL_URL}/api/auth/verify?code=${code}`}>
								{translation("template.verificationLink")}
							</a>
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
};
