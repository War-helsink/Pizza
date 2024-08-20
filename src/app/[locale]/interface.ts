export interface Props {
	params: { locale: string };
}

export interface RootLayoutProps extends Props {
	children: React.ReactNode;
}
