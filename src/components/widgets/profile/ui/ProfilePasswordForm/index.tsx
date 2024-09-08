"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserPassword } from "@/app/[locale]/actions";
import {
	type TFormPasswordValues,
	formPasswordSchema,
} from "@/components/features/auth";
import { FormInput, Button } from "@/components/shared/ui";

export const ProfilePasswordForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	const form = useForm<TFormPasswordValues>({
		resolver: zodResolver(formPasswordSchema),
		defaultValues: {
			password: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: TFormPasswordValues) => {
		try {
			setIsLoading(true);
			await updateUserPassword(data);

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
				<FormInput
					type="password"
					name="password"
					label={t("profile.password.current")}
					required
				/>
				<FormInput
					type="password"
					name="newPassword"
					label={t("profile.password.new")}
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					label={t("profile.password.confirm")}
					required
				/>

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
