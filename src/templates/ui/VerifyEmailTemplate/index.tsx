import type { Locale } from "@prisma/client";
import type { TFunction } from "i18next";

import {
	Section,
	Heading,
	Link,
	Hr,
	Text,
	Button,
} from "@react-email/components";

import { MainTemplate } from "../MainTemplate";

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
		<MainTemplate
			lang={lang}
			translation={translation}
			textHeader={translation("template.title.verifyEmail")}
			textPreview={translation("template.notification")}
		>
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

					<Link href={`${VERCEL_URL}/api/auth/verify?code=${code}`}>
						<Text style={codeText}>{code}</Text>
					</Link>
				</Section>
			</Section>
			<Hr />
			<Section style={lowerSection}>
				<Text style={cautionText}>
					{translation("template.letter.verifyEmail.caution")}
				</Text>
				<div style={buttons}>
					<Button
						href={`${VERCEL_URL}/api/auth/verify?code=${code}`}
						style={button}
					>
						{translation("template.goToSite")}
					</Button>
				</div>
			</Section>
		</MainTemplate>
	);
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

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const verifyText = {
	...text,
	margin: 0,
	fontWeight: "bold",
	textAlign: "center" as const,
};

const codeText = {
	...text,
	color: "#007bff",
	fontWeight: "bold",
	fontSize: "36px",
	margin: "10px 0",
	textAlign: "center" as const,
	textDecoration: "underline",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

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
