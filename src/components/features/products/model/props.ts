export interface ProductsGroupListProps {
	title: string;
	categoryId: string;

	items: any[];
	className?: string;
}

export interface ProductCardProps {
	name: string;
	price: number;
	count?: number;
	imageUrl: string;
	className?: string;
}
