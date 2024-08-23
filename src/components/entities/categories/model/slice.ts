import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Category } from "./types";

export interface State {
	categories: Category[];
	categoryId: number;
}

const initialState: State = {
	categories: [],
	categoryId: 0,
};

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
	},
});

export const { setCategoryId, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
