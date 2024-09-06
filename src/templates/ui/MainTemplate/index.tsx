import type { Locale } from "@prisma/client";
import type { TFunction } from "i18next";
import {
	Html,
	Preview,
	Body,
	Section,
	Container,
} from "@react-email/components";

import { HeaderTemplate } from "../HeaderTemplate";
import { FooterTemplate } from "../FooterTemplate";

export interface MainTemplateProps extends React.PropsWithChildren {
	lang: Locale;
	textHeader: string;
	textPreview: string;
	translation: TFunction;
	childrenHeader?: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({
	lang,
	textHeader,
	textPreview,
	children,
	childrenHeader,
	translation,
}) => {
	return (
		<Html lang={lang}>
			<HeaderTemplate title={textHeader}>{childrenHeader}</HeaderTemplate>
			<Preview>{textPreview}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={coverSection}>{children}</Section>
					<FooterTemplate translation={translation} />
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

const coverSection = { backgroundColor: "#fff" };
