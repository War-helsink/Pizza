"use client";

import { useTranslation } from "react-i18next";
import { WhiteBlock, FormInput } from "@/components/shared/ui";

import type { CheckoutPersonalFormProps } from "../../model/props";

export const CheckoutPersonalForm: React.FC<CheckoutPersonalFormProps> = ({
	className,
}) => {
	const { t } = useTranslation();

	return (
		<WhiteBlock title={t("checkout.form.personalData")} className={className}>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
				<FormInput
					name="firstName"
					className="text-base"
					placeholder={t("checkout.form.firstName")}
				/>
				<FormInput
					name="lastName"
					className="text-base"
					placeholder={t("checkout.form.lastName")}
				/>
				<FormInput
					name="email"
					className="text-base"
					placeholder={t("checkout.form.email")}
				/>
				<FormInput
					name="phone"
					className="text-base"
					placeholder={t("checkout.form.phone")}
				/>
			</div>
		</WhiteBlock>
	);
};
