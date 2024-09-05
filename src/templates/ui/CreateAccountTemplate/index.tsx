import type { Locale } from "@/@types/prisma";
import type { TFunction } from "i18next";

import { Section, Heading, Hr, Text, Button } from "@react-email/components";

import { MainTemplate } from "../MainTemplate";

export interface CreateAccountTemplateProps {
	lang: Locale;
	translation: TFunction;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const CreateAccountTemplate: React.FC<CreateAccountTemplateProps> = ({
	translation,
	lang,
}) => {
	return (
		<MainTemplate
			lang={lang}
			translation={translation}
			textHeader={translation("template.title.createAccount")}
			textPreview={translation("template.notification")}
		>
			<Section style={section}>
				<Heading style={h1}>
					{translation("template.letter.createAccount.title")}
				</Heading>
				<Hr style={hr} />
				<Text style={paragraph}>
					{translation("template.letter.createAccount.message")}
				</Text>
				<Text style={paragraph}>
					{translation("template.letter.createAccount.information")}
				</Text>

				<div style={buttons}>
					<Button style={button} href={`${VERCEL_URL}/profile`}>
						{translation("template.letter.createAccount.button")}
					</Button>
				</div>
			</Section>
		</MainTemplate>
	);
};

const section = { padding: "25px 35px" };

const h1 = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "20px",
	fontWeight: "bold",
	textAlign: "center" as const,
	marginBottom: "15px",
};

const hr = {
	borderColor: "#e6ebf1",
	margin: "20px 0",
};

const paragraph = {
	color: "#525f7f",

	fontSize: "16px",
	lineHeight: "24px",
	textAlign: "left" as const,
};

const buttons = {
	textAlign: "center" as const,
};

const button = {
	fontSize: "16px",
	fontWeight: "bold",
	padding: "10px 20px",
	backgroundColor: "#007bff",
	color: "#ffffff",
	textDecoration: "none",
	borderRadius: "5px",
};
