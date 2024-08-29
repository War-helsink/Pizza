"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface AdressInputProps {
	onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<AdressInputProps> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
