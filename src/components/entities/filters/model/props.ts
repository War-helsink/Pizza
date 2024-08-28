export interface FilterChecboxProps {
	text: string;
	name?: string;
	value: string;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
}

export interface CheckboxFiltersGroupProps {
	title: string;
	name?: string;

	items: FilterChecboxProps[];
	limit?: number;
	searchInputPlaceholderKey?: string;
	isLoading?: boolean;
	className?: string;

	onClickCheckbox?: (value: string) => void;
	selected?: Set<string>;
}
