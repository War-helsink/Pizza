import initTranslations from "@/libs/i18n";
import type { Locale } from "@prisma/client";
import { Button, Title } from "@/components/shared/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface Props {
	params: { locale: Locale };
}

export default async function UnauthorizedPage({ params: { locale } }: Props) {
	const { t } = await initTranslations({ locale });

	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<div className="flex items-center justify-between w-[840px] gap-12">
				<div className="flex flex-col">
					<div className="w-[445px]">
						<Title
							size="lg"
							text={t("unauthorized.title")}
							className="font-extrabold"
						/>
						<p className="text-gray-400 text-lg">{t("unauthorized.text")}</p>
					</div>

					<div className="flex gap-5 mt-11">
						<Link href="/">
							<Button variant="outline" className="gap-2">
								<ArrowLeft />
								{t("unauthorized.goHome")}
							</Button>
						</Link>

						<Button
							variant="outline"
							className="text-gray-500 border-gray-400 hover:bg-gray-50"
						>
							{t("unauthorized.refresh")}
						</Button>
					</div>
				</div>

				<img
					src={"/assets/images/lock.png"}
					alt={t("unauthorized.title")}
					loading="lazy"
					width={300}
				/>
			</div>
		</div>
	);
}
