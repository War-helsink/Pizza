import type { Locale } from "@/@types/prisma";
import type { TFunction } from "i18next";

import {
	Html,
	Preview,
	Body,
	Section,
	Container,
	Heading,
	Link,
	Hr,
	Text,
	Button,
} from "@react-email/components";

import { HeaderTemplate } from "../HeaderTemplate";

export interface VerifyEmailTemplateProps {
	lang: Locale;
	code: string;
	translation: TFunction;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const VerifyEmailTemplate: React.FC<VerifyEmailTemplateProps> = ({
	code,
	translation,
	lang,
}) => {
	return (
		<Html lang={lang}>
			<HeaderTemplate title={translation("template.title.verificationUser")} />
			<Preview>{translation("template.notification")}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={coverSection}>
						<Section style={upperSection}>
							<Heading style={h1}>
								{translation("template.letter.verifyEmail.title")}
							</Heading>
							<Text style={mainText}>
								{translation("template.letter.verifyEmail.message")}
							</Text>
							<Section>
								<Text style={verifyText}>
									{translation("template.letter.verifyEmail.verify")}
								</Text>

								<Text style={codeText}>
									<Link href={`${VERCEL_URL}/api/auth/verify?code=${code}`}>
										{code}
									</Link>
								</Text>
							</Section>
						</Section>
						<Hr />
						<Section style={lowerSection}>
							<Text style={cautionText}>
								{translation("template.letter.verifyEmail.caution")}
							</Text>
							<div style={ButtonsStyle}>
								<Button
									href={`${VERCEL_URL}/api/auth/verify?code=${code}`}
									style={ButtonStyle}
								>
									{translation("template.goToSite")}
								</Button>
							</div>
						</Section>
					</Section>

					<Text style={footerText}>
						{translation("template.letter.verifyEmail.footer")}
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	backgroundColor: "#eee",
	color: "#212121",
};

const container = {
	padding: "20px",
	margin: "0 auto",
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

const text = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	margin: "24px 0",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
	...text,
	fontSize: "12px",
	padding: "0 20px",
};

const verifyText = {
	...text,
	margin: 0,
	fontWeight: "bold",
	textAlign: "center" as const,
};

const codeText = {
	...text,
	fontWeight: "bold",
	fontSize: "36px",
	margin: "10px 0",
	textAlign: "center" as const,
	textDecoration: "underline",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

const ButtonsStyle = {
	textAlign: "center" as const,
	marginTop: "20px",
};

const ButtonStyle = {
	padding: "10px 20px",
	backgroundColor: "#007bff",
	color: "#ffffff",
	textDecoration: "none",
	borderRadius: "5px",
};
