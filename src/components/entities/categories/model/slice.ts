import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { CategoryType } from "./type";

export interface State {
	categories: CategoryType[];
	categoryId: string;
}

const initialState: State = {
	categories: [
		"pizza",
		"combo",
		"appetizers",
		"cocktails",
		"coffee",
		"drinks",
		"desserts",
	],
	categoryId: "pizza",
};

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<string>) => {
			state.categoryId = action.payload;
		},
	},
});

export const { setCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
