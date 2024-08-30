"use client";

import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import {
	WhiteBlock,
	FormTextarea,
	ErrorText,
	AdressInput,
} from "@/components/shared/ui";

import type { CheckoutAddressFormProps } from "../../model/props";

export const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({
	className,
}) => {
	const { t } = useTranslation();
	const { control } = useFormContext();

	return (
		<WhiteBlock
			title={t("checkout.form.deliveryAddress")}
			className={className}
		>
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AdressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name="comment"
					className="text-base"
					placeholder={t("checkout.form.commentPlaceholder")}
					rows={5}
				/>
			</div>
		</WhiteBlock>
	);
};
