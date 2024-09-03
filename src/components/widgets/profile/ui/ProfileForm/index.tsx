"use client";

import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserInfo } from "@/app/[locale]/actions";
import {
	type TFormRegisterValues,
	formRegisterSchema,
} from "@/components/features/auth";
import { Container, Title, FormInput, Button } from "@/components/shared/ui";

import type { ProfileFormProps } from "../../model/props";

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
	const { t } = useTranslation();

	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success(t("toastMessages.success.updated"), {
				icon: "✅",
			});
		} catch (error) {
			return toast.error(t("toastMessages.error.updated"), {
				icon: "❌",
			});
		}
	};

	const onClickSignOut = () => {
		signOut({
			callbackUrl: "/",
		});
	};

	return (
		<Container className="my-10">
			<Title
				text={`${t("profile.personalData")}${data.id}`}
				size="md"
				className="font-bold"
			/>

			<FormProvider {...form}>
				<form
					className="flex flex-col gap-5 w-96 mt-10"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput name="email" label={t("profile.email")} required />
					<FormInput name="fullName" label={t("profile.fullName")} required />

					<FormInput
						type="password"
						name="password"
						label={t("profile.newPassword")}
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						label={t("profile.confirmPassword")}
						required
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className="text-base mt-10"
						type="submit"
					>
						{t("profile.save")}
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base"
						type="button"
					>
						{t("profile.signOut")}
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
