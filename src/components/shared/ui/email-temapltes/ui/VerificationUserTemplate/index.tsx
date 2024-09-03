import type { TFunction } from "i18next";

export interface VerificationUserTemplateProps {
	code: string;
	translation: TFunction;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const VerificationUserTemplate: React.FC<
	VerificationUserTemplateProps
> = ({ code, translation }) => {
	return (
		<div>
			<p dangerouslySetInnerHTML={{
				__html: translation("template.verificationCode", { code })
			}} />

			<p>
				<a href={`${VERCEL_URL}/api/auth/verify?code=${code}`}>
					{translation("template.verificationLink")}
				</a>
			</p>
		</div>
	);
};
