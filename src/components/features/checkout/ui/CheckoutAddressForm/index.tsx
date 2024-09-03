"use client";

import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import {
	WhiteBlock,
	FormTextarea,
	ErrorText,
	NovaPoshtaInput,
} from "@/components/shared/ui";
import type { CheckoutFormValues } from "@/config/checkout-form-schema";

import type { CheckoutAddressFormProps } from "../../model/props";

export const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({
	className,
}) => {
	const { t } = useTranslation();
	const { control } = useFormContext<CheckoutFormValues>();

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
						<NovaPoshtaInput
							onChange={field.onChange}
							errorCity={
								fieldState.error &&
								(fieldState.error as any).cityRef && (
									<ErrorText
										text={t((fieldState.error as any).cityRef.message)}
									/>
								)
							}
							errorWarehouse={
								fieldState.error &&
								(fieldState.error as any).warehouseRef && (
									<ErrorText
										text={t((fieldState.error as any).warehouseRef.message)}
									/>
								)
							}
						/>
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
