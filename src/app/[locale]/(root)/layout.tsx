import { Header } from "@/components/widgets/header";

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col min-h-dvh">
			<Header />
			<main className="flex-grow">
				{children}
				{modal}
			</main>
		</div>
	);
}
