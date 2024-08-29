import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartStateItem } from "@/libs/get-cart-details";

export interface State {
	items: CartStateItem[];
	totalAmount: number;
	isLoading: boolean;
}

const initialState: State = {
	items: [],
	totalAmount: 0,
	isLoading: true,
};

export const cartsSlice = createSlice({
	name: "carts",
	initialState,
	reducers: {
		setAll: (state, action: PayloadAction<State>) => {
			state.totalAmount = action.payload.totalAmount;
			state.isLoading = action.payload.isLoading;
			state.items = [...action.payload.items];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setItems: (state, action: PayloadAction<CartStateItem[]>) => {
			state.items = [...action.payload];
		},
		setTotalAmount: (state, action: PayloadAction<number>) => {
			state.totalAmount = action.payload;
		},
	},
});

export const { setAll, setItems, setLoading, setTotalAmount } =
	cartsSlice.actions;

export default cartsSlice.reducer;
