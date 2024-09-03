"use client";

import Link from "next/link";
import { CircleUser } from "lucide-react";

import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/shared/ui";
import { AuthModal } from "../AuthModal";

import type { AuthButtonProps } from "../../model/props";

export const AuthButton: React.FC<AuthButtonProps> = ({ className }) => {
	const { data: session } = useSession();
	const { t } = useTranslation();

	return (
		<div className={className}>
			{!session ? (
				<AuthModal />
			) : (
				<Link href="/profile">
					<Button variant="secondary" className="flex items-center gap-2">
						<CircleUser size={18} />
						{t("header.profile")}
					</Button>
				</Link>
			)}
		</div>
	);
};
