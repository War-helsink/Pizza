import type { SendMailOptions } from "nodemailer";
import { createTransport } from "nodemailer";
import { render } from "@react-email/components";

const EMAIL = process.env.EMAIL;
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

export async function sendEmail(
	to: string,
	subject: string,
	template: React.ReactElement,
) {
	const transporter = createTransport({
		service: "Gmail",
		auth: {
			user: EMAIL,
			pass: PASSWORD_EMAIL,
		},
	});

	const mailOptions: SendMailOptions = {
		from: EMAIL,
		to: to,
		subject: subject,
		text: await render(template, {
			plainText: true,
		}),
		html: await render(template),
	};

	return await transporter.sendMail(mailOptions).catch((err) => {
		console.error("[SendMessage] Server error", err);
	});
}
