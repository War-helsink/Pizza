"use client";

import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { Input, ClearButton, ErrorText } from "../";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	...props
}) => {
	const { t } = useTranslation();
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext();

	const value = watch(name);
	const errorKey = errors[name]?.message as string;

	const onClickClear = () => {
		setValue(name, "", { shouldValidate: true });
	};

	return (
		<div className={className}>
			{label && (
				<p className="font-medium mb-2">
					{label} {required && <span className="text-red-500">*</span>}
				</p>
			)}

			<div className="relative">
				<Input className="h-12 text-md" {...register(name)} {...props} />

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorKey && <ErrorText text={t(errorKey)} className="mt-2" />}
		</div>
	);
};
