import { cn } from "@/libs/utils";

interface Props extends React.PropsWithChildren {
	className?: string;
}

export const Container: React.FC<Props> = ({ className, children }) => {
	return (
		<div className={cn("max-w-full px-3 lg:max-w-[1280px] mx-auto overflow-hidden", className)}>
			{children}
		</div>
	);
};
