export interface CreateCartItemValues {
	productItemId: number;
	ingredients?: number[];
}

export interface UpdateItemQuantityParams {
	id: number;
	quantity: number;
}

export interface RemoveCartItemParams {
	id: number;
}

export interface AddCartItemParams {
	values: CreateCartItemValues;
}
