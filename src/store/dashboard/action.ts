import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionTypes, AddInvestmentPayload } from './interface';
import apiClient from '../../utils/axios';
import { API_PATHS } from '../../utils/consts';

export const getInvestmentData = createAsyncThunk(
	ActionTypes.FETCH_INVESTMENTS,
	async () => {
		try {
			const response = await apiClient.get(API_PATHS.INVESTMENTS);

			if (response.status !== 200) {
				throw new Error('Error fetching investments');
			}

			return response.data;
		} catch (error) {}
	}
);

export const closeInvestment = createAsyncThunk(
	ActionTypes.CLOSE_INVESTMENT,
	async (id: number) => {
		try {
			const response = await apiClient.post(`${API_PATHS.INVESTMENTS}/${id}`);

			if (response.status !== 200) {
				throw new Error('Error closing investment');
			}

			return response.data;
		} catch (error) {}
	}
);

export const createInvestment = createAsyncThunk(
	ActionTypes.CREATE_INVESTMEN,
	async (payload: AddInvestmentPayload) => {
		try {
			const response = await apiClient.post(API_PATHS.INVESTMENTS, {
				...payload
			});

			if (response.status !== 200) {
				throw new Error('Error creating investment');
			}

			return response.data;
		} catch (error) {}
	}
);
