"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { registerUser } from "@/app/[locale]/actions";
import {
	type TFormRegisterValues,
	formRegisterSchema,
} from "../../lib/schemas";
import { Button, FormInput } from "@/components/shared/ui";

export const RegisterForm: React.FC = () => {
	const { t } = useTranslation();

	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: "",
			fullName: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success(t("toastMessages.success.register"), {
				icon: "✅",
			});
		} catch (error) {
			console.error("Error [REGISTER]", error);
			toast.error(t("toastMessages.error.register"), {
				icon: "❌",
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput name="email" label={t("auth.email")} required />
				<FormInput name="fullName" label={t("auth.full_name")} required />
				<FormInput
					name="password"
					label={t("auth.password")}
					type="password"
					required
				/>
				<FormInput
					name="confirmPassword"
					label={t("auth.confirm_password")}
					type="password"
					required
				/>

				<Button
					isLoading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					{t("auth.register_button")}
				</Button>
			</form>
		</FormProvider>
	);
};
