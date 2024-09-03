"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerUser } from "@/app/[locale]/actions";
import {
	type TFormRegisterValues,
	formRegisterSchema,
} from "../../lib/schemas";
import { Button, FormInput } from "@/components/shared/ui";

import type { RegisterFormProps } from "../../model/props";

export const RegisterForm: React.FC<RegisterFormProps> = ({
	onClose,
}) => {
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

			toast.error("Регистрация успешна 📝. Подтвердите свою почту", {
				icon: "✅",
			});

			onClose?.();
		} catch (error) {
			return toast.error("Неверный E-Mail или пароль", {
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
				<FormInput name="email" label="E-Mail" required />
				<FormInput name="fullName" label="Полное имя" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<FormInput
					name="confirmPassword"
					label="Подтвердите пароль"
					type="password"
					required
				/>

				<Button
					isLoading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};
