import Link from "next/link";
import {
	Button,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/shared/ui";
import { SignOut } from "@/components/features/auth";
import { cn } from "@/libs/utils";

import type { ProfileNavProps } from "../../model/props";
import { paths } from "../../config/path";

export const ProfileNav: React.FC<ProfileNavProps> = ({
	activePath,
	translation,
}) => {
	return (
		<>
			<div className="flex items-center justify-between">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">
								{translation("profile.nav.home")}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink className="cursor-pointer">
								{translation("profile.nav.specialOffice")}
							</BreadcrumbLink>
						</BreadcrumbItem>

						{activePath && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>
										{translation(`profile.title.${activePath}`)}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>

				<SignOut />
			</div>
			<nav className="w-full grid grid-cols-4 items-center justify-center rounded-md bg-secondary p-1 text-muted-foreground">
				{paths.map((path) => (
					<Link key={path} href={`/profile/${path}`}>
						<Button
							className={cn(
								"w-full h-8 text-primary bg-inherit hover:bg-primary hover:text-secondary hover:shadow-sm py-1.5",
								activePath === path && "bg-primary text-secondary shadow-sm",
							)}
						>
							{translation(`profile.title.${path}`)}
						</Button>
					</Link>
				))}
			</nav>
		</>
	);
};
