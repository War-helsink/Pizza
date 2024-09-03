"use client";

import { cn } from "@/libs/utils";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { useClickAway, useDebounce } from "react-use";
import {
	Input,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/shared/ui";
import {
	type City,
	type Warehouse,
	useLazyGetCityQuery,
	useLazyGetWarehousesQuery,
} from "@/components/entities/novaposhta";

export interface NovaPoshtaInputProps {
	errorCity?: React.ReactNode;
	errorWarehouse?: React.ReactNode;
	onChange?: (value: { cityRef: string; warehouseRef: string }) => void;
}

export const NovaPoshtaInput: React.FC<NovaPoshtaInputProps> = ({
	onChange,
	errorCity,
	errorWarehouse,
}) => {
	const { t } = useTranslation();
	const [cityName, setCityName] = useState("");
	const [focused, setFocused] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedCity, setSelectedCity] = useState<City | null>(null);
	const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
		null,
	);

	const [triggerCity, { data: cities }] = useLazyGetCityQuery();
	const ref = useRef(null);
	const [triggerWarehouse, { data: warehouses }] = useLazyGetWarehousesQuery();

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			if (cityName.trim().length > 2) {
				triggerCity({ cityName });
			}
		},
		500,
		[cityName],
	);

	useEffect(() => {
		if (selectedCity && selectedWarehouse) {
			onChange
				? onChange({
						cityRef: selectedCity.Ref,
						warehouseRef: selectedWarehouse.Ref,
					})
				: null;
		}
	}, [selectedCity, selectedWarehouse, onChange]);

	const handleCitySelect = (city: City) => {
		setFocused(false);
		setCityName(city.Description);
		setSelectedCity(city);
		triggerWarehouse({ cityName: city.Ref });
	};

	return (
		<div className="flex flex-col gap-4">
			<div ref={ref} className="rounded-xl relative z-30">
				<Input
					value={cityName}
					onFocus={() => setFocused(true)}
					onChange={(e) => {
						setCityName(e.target.value);
						setSelectedCity(null);
						setSelectedWarehouse(null);
						onChange
							? onChange({
									cityRef: "",
									warehouseRef: "",
								})
							: null;
					}}
					placeholder={t("checkout.form.selectCity")}
					autoComplete="new-password"
				/>
				{cities && cities.length > 0 && (
					<ul
						className={cn(
							"absolute top-full w-full max-h-60 border mt-4 bg-white rounded-xl shadow-md overflow-y-auto transition-all duration-200 invisible opacity-0 -z-30",
							focused && "visible opacity-100 z-30",
						)}
					>
						{cities.map((city) => (
							<li
								onClick={() => handleCitySelect(city)}
								key={city.Ref}
								className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
							>
								<span>{city.Description}</span>
							</li>
						))}
					</ul>
				)}
			</div>
			{errorCity}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="w-full">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between text-black border-input hover:bg-inherit"
					>
						{selectedWarehouse && warehouses
							? warehouses.find(
									(warehouses) =>
										warehouses.Description === selectedWarehouse.Description,
								)?.Description
							: t("checkout.form.selectWarehouse")}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full">
					<Command className="w-full">
						<CommandInput placeholder={t("checkout.form.searchWarehouse")} />
						<CommandList>
							<CommandEmpty>{t("checkout.form.noWarehouseFound")}</CommandEmpty>
							<CommandGroup>
								{warehouses?.map((warehouse) => (
									<CommandItem
										className="cursor-pointer"
										key={warehouse.Ref}
										value={warehouse.Description}
										onSelect={(currentValue) => {
											setSelectedWarehouse(
												currentValue === selectedWarehouse?.Description
													? null
													: warehouse,
											);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												selectedWarehouse?.Description === warehouse.Description
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{warehouse.Description}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{errorWarehouse}
		</div>
	);
};
