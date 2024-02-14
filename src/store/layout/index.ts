import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LayoutState } from './interface';
import { RootState } from '..';

const initialState: LayoutState = {
	isDarkMode: false,
	isSidebarExpanded: false
};

const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		setDarkMode: (state, action) => {
			state.isDarkMode = action.payload;
		},

		toggleSideBar: (state, acttion: PayloadAction<boolean>) => {
			state.isSidebarExpanded = acttion.payload;
		}
	}
});

export const { toggleSideBar, setDarkMode } = layoutSlice.actions;

export const selectIsDarkModeEnabled = (state: RootState) =>
	state.layout.isDarkMode;
export const selectIsSideBarExpanded = (state: RootState) =>
	state.layout.isSidebarExpanded;

export default layoutSlice.reducer;
