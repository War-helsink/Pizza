import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/components/entities/categories";

export const rootReducer = combineReducers({
	category: categoriesReducer,
});
