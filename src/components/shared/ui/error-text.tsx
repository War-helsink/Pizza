import { cn } from "@/libs/utils";

interface ErrorTextProps {
	text: string;
	className?: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ text, className }) => {
	return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};
