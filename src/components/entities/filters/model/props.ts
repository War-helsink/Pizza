export interface FilterChecboxProps {
	text: string;
	value: string;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
}

export  interface CheckboxFiltersGroupProps {
  title: string;
  items: FilterChecboxProps[];
  defaultItems?: FilterChecboxProps[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
}
