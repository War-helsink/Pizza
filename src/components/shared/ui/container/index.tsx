import { cn } from "@/libs/utils";

interface Props extends React.PropsWithChildren{
	className?: string;
}

export const Container: React.FC<Props> = ({
	className,
	children,
}) => {
	return (
		<div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
	);
};
