import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
	categoryId: number;
}

const initialState: State = {
	categoryId: 0,
};

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
	},
});

export const { setCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
