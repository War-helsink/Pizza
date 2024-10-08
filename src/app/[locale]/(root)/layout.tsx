import { Suspense } from "react";
import { Header } from "@/components/widgets/header";

export default async function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-dvh">
			<Suspense>
				<Header />
			</Suspense>
			<main className="flex-grow">
				{children}
				{modal}
			</main>
		</div>
	);
}
