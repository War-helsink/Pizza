"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { SearchInput } from "@/components/features/search";
import { GroceryBasket } from "@/components/features/grocery-basket";
import { LanguageButton } from "@/components/features/language";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Button, Container } from "@/components/shared/ui";

import type { HeaderProps } from "../../model/props";

export const Header: React.FC<HeaderProps> = ({ className }) => {
	const { t } = useTranslation();

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

				<div className="mx-10 flex-1">
					<SearchInput />
				</div>

				<div className="flex items-center gap-3">
					<LanguageButton />
					<Button className="flex items-center gap-3" variant="outline">
						<User size={16} />
						{t("header.login")}
					</Button>

					<GroceryBasket>
						<Button className="group relative">
							<b>520 ₴</b>
							<span className="h-full w-[1px] bg-white/30 mx-3" />
							<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
								<ShoppingCart size={16} strokeWidth={2} />
								<b>3</b>
							</div>
							<ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
						</Button>
					</GroceryBasket>
				</div>
			</Container>
		</header>
	);
};
