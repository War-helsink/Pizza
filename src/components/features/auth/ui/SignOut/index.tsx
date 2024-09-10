"use client";

import { cn } from "@/libs/utils";
import { removeCookie } from "react-use-cookie";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/ui";

export const SignOut: React.FC<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
	const { t } = useTranslation();

	const onClickSignOut = () => {
		removeCookie("cartToken");

		signOut({
			callbackUrl: "/",
		});
	};

	return (
		<Button
			onClick={onClickSignOut}
			variant="secondary"
			className={cn("text-base", className)}
			type="button"
			{...props}
		>
			{t("profile.signOut")}
		</Button>
	);
};
