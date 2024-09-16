"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserInfo } from "@/app/[locale]/actions";
import {
	type TFormUpdateValues,
	formUpdateSchema,
} from "@/components/features/auth";
import { FormInput, Button } from "@/components/shared/ui";

import type { ProfileAccountFormProps } from "../../model/props";

export const ProfileAccountForm: React.FC<ProfileAccountFormProps> = ({
	user,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	const form = useForm<TFormUpdateValues>({
		resolver: zodResolver(formUpdateSchema),
		defaultValues: {
			firstName: user.firstName,
			secondName: user.secondName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
		},
	});

	const onSubmit = async (data: TFormUpdateValues) => {
		try {
			setIsLoading(true);

			await updateUserInfo({
				firstName: data.firstName,
				secondName: data.secondName,
				lastName: data.lastName,
				phone: data.phone,
				email: data.email,
			});

			setIsLoading(false);
			toast.success(t("toastMessages.success.updated"), {
				icon: "✅",
			});
		} catch (error) {
			setIsLoading(false);
			return toast.error(t("toastMessages.error.updated"), {
				icon: "❌",
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className="w-full flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
					<FormInput name="firstName" label={t("profile.account.firstName")} />
					<FormInput
						name="secondName"
						label={t("profile.account.secondName")}
					/>
					<FormInput name="lastName" label={t("profile.account.lastName")} />
				</div>

				<FormInput name="phone" label={t("profile.account.phone")} />
				<FormInput name="email" label={t("profile.account.email")} />

				<div className="w-full flex justify-center">
					<Button
						isLoading={isLoading}
						disabled={form.formState.isSubmitting}
						className="text-base mt-10 w-52"
						type="submit"
					>
						{t("profile.save")}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
