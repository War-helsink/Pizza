import { Checkbox } from "@/components/shared/ui";

import type { FilterChecboxProps } from "../../model/props";

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className="rounded-[8px] w-6 h-6"
				id={`checkbox-${String(value)}`}
			/>
			<label
				htmlFor={`checkbox-${String(value)}`}
				className="leading-none cursor-pointer flex-1"
			>
				{text}
			</label>
			{endAdornment}
		</div>
	);
};
