"use client";

import { cn } from "@/libs/utils";
import toast from "react-hot-toast";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { AuthButton } from "@/components/features/auth";
import { CartButton } from "@/components/features/cart";
import { SearchInput } from "@/components/features/search";
import { LanguageButton } from "@/components/features/language";
import { Container } from "@/components/shared/ui";

import type { HeaderProps } from "../../model/props";

export const Header: React.FC<HeaderProps> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	const { t } = useTranslation();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		let toastMessage = "";

		if (searchParams.has("paid")) {
			toastMessage = t("toastMessages.paidOrderSuccess");
		}

		if (searchParams.has("verified")) {
			toastMessage = t("toastMessages.emailVerified");
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace("/");
				toast.success(toastMessage, {
					duration: 3000,
				});
			}, 1000);
		}
	}, [t, router, searchParams]);

	return (
		<header className={cn("border border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image
							src="/icon512.png"
							width={35}
							height={35}
							alt={t("header.logoAlt")}
						/>
						<div>
							<h1 className="text-2xl uppercase font-black">
								{t("header.title")}
							</h1>
							<p className="text-sm text-gray-400 leading-3">
								{t("header.subtitle")}
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				<div className="flex items-center gap-3">
					<LanguageButton />

					<AuthButton />
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
