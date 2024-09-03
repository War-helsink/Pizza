import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button, FormInput } from "@/components/shared/ui";
import { type TFormLoginValues, formLoginSchema } from "../../lib/schemas";

import type { LoginFormProps } from "../../model/props";

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (!resp?.ok) {
				throw Error();
			}

			toast.success("Вы успешно вошли в аккаунт", {
				icon: "✅",
			});

			onClose?.();
		} catch (error) {
			console.error("Error [LOGIN]", error);
			toast.error("Не удалось войти в аккаунт", {
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
				<FormInput name="password" label="Пароль" type="password" required />

				<Button
					isLoading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
