import { Head, Font } from "@react-email/components";

export interface HeaderTemplateProps extends React.PropsWithChildren {
	title: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ title, children }) => {
	return (
		<Head>
			<title>{title}</title>
			<Font
				fontFamily="Roboto"
				fallbackFontFamily="Verdana"
				webFont={{
					url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
					format: "woff2",
				}}
				fontWeight={600}
				fontStyle="normal"
			/>
			{children}
		</Head>
	);
};
