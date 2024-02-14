import { createSlice } from '@reduxjs/toolkit';
import { DashboardState } from './interface';
import { closeInvestment, createInvestment, getInvestmentData } from './action';
import { RootState } from '..';

const initialState: DashboardState = {
	investments: []
};

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getInvestmentData.fulfilled, (state, action) => {
			state.investments = action.payload;
		}),
			builder.addCase(closeInvestment.fulfilled, (state, action) => {
				const investment = state.investments.find(
					(i) => i.id === action.payload.id
				);

				if (investment) {
					investment.status = 'closed';
				}
			}),
			builder.addCase(createInvestment.fulfilled, (state, action) => {
				state.investments = [...state.investments, action.payload];
			});
	}
});

export const selectInvestmentData = (state: RootState) =>
	state.dashboard.investments;

export default dashboardSlice.reducer;
