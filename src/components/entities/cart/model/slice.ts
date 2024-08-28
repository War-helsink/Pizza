import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartStateItem  } from "@/libs/get-cart-details";

export interface State {
	items: CartStateItem[];
	totalAmount: number;
}

const initialState: State = {
	items: [],
	totalAmount: 0,
};

export const cartsSlice = createSlice({
	name: "carts",
	initialState,
	reducers: {
		setTotalAmount: (state, action: PayloadAction<number>) => {
			state.totalAmount = action.payload;
		},
		setItems: (state, action: PayloadAction<CartStateItem[]>) => {
			state.items = [...action.payload];
		},
	},
});

export const { setItems, setTotalAmount } = cartsSlice.actions;

export default cartsSlice.reducer;
