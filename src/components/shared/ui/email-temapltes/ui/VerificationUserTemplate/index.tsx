export interface VerificationUserTemplateProps {
	code: string;
}

const VERCEL_URL = process.env.VERCEL_URL;

export const VerificationUserTemplate: React.FC<
	VerificationUserTemplateProps
> = ({ code }) => {
	return (
		<div>
			<p>
				Код подтверждения: <h2>{code}</h2>
			</p>

			<p>
				<a href={`${VERCEL_URL}/api/auth/verify?code=${code}`}>
					Подтвердить регистрацию
				</a>
			</p>
		</div>
	);
};
