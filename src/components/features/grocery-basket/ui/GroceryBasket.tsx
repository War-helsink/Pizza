import {
	Button,
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/shared/ui";
import { GroceryItem } from "@/components/entities/basket";
import { ArrowRight } from "lucide-react";

export const GroceryBasket: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<div>
					<SheetHeader>
						<SheetTitle>
							В корзине <span className="font-bold">3 товара</span>
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-2 -mx-6 mt-5">
						<GroceryItem
							name="Чизбургер-пицца"
							imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
							price={500}
						/>
						<GroceryItem
							name="Чизбургер-пицца"
							imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
							price={350}
							count={3}
						/>
					</div>
				</div>

				<SheetFooter className="-mx-6 bg-white p-5">
					<Button type="submit" className="w-full h-12 text-base">
						Оформить заказ
						<ArrowRight className="w-5 ml-2" />
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
