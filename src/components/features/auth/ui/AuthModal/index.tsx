"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shared/ui";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

export const AuthModal: React.FC = () => {
	const { t } = useTranslation();
	const [type, setType] = useState<"login" | "register">("login");

	const onSwitchType = () => {
		setType(type === "login" ? "register" : "login");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex items-center gap-1">
					<User size={16} />
					{t("header.login")}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[450px] bg-white p-10">
				{type === "login" ? (
					<DialogHeader>
						<DialogTitle>Вход в аккаунт</DialogTitle>
						<DialogDescription>
							Введите свою почту, чтобы войти в свой аккаунт
						</DialogDescription>
					</DialogHeader>
				) : (
					<VisuallyHidden>
						<DialogHeader>
							<DialogTitle>Вход в аккаунт</DialogTitle>
							<DialogDescription>
								Введите свою почту, чтобы войти в свой аккаунт
							</DialogDescription>
						</DialogHeader>
					</VisuallyHidden>
				)}

				{type === "login" ? (
					<LoginForm
						onClose={() => {
							console.log("onClose LoginForm");
						}}
					/>
				) : (
					<RegisterForm
						onClose={() => {
							console.log("onClose RegisterForm");
						}}
					/>
				)}

				<hr />
				<div className="flex gap-2">
					<Button
						variant="secondary"
						onClick={() =>
							signIn("github")
						}
						type="button"
						className="gap-2 h-12 p-2 flex-1"
					>
						<img
							className="w-6 h-6"
							src="https://github.githubassets.com/favicons/favicon.svg"
						/>
						GitHub
					</Button>

					<Button
						variant="secondary"
						onClick={() =>
							signIn("google", {
								callbackUrl: "/",
								redirect: true,
							})
						}
						type="button"
						className="gap-2 h-12 p-2 flex-1"
					>
						<img
							className="w-6 h-6"
							src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
						/>
						Google
					</Button>
				</div>

				<Button
					variant="outline"
					onClick={onSwitchType}
					type="button"
					className="h-12"
				>
					{type !== "login" ? "Войти" : "Регистрация"}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
