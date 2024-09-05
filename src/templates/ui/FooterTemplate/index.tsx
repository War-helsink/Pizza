import { Text } from "@react-email/components";
import type { TFunction } from "i18next";

export interface FooterTemplateProps {
	translation: TFunction;
}

export const FooterTemplate: React.FC<FooterTemplateProps> = ({
	translation,
}) => {
	return (
		<Text style={footerText}>
			{translation("template.footer")}
		</Text>
	);
};

const footerText = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	margin: "24px 0",
	fontSize: "12px",
	padding: "0 20px",
};
