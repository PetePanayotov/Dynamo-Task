import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionTypes, AddUserPayload } from "./interface";
import apiClient from "../../utils/axios";
import { API_PATHS } from "../../utils/consts";

export const fetchUsers = createAsyncThunk(
    ActionTypes.FETCH_USERS,
    async() => {

        try {
            const response = await apiClient.get(API_PATHS.USERS);

            if(response.status !== 200) {
                throw new Error('Error fetching users')
            };

            return response.data
            
        } catch (error) {
            
        }
    }
);

export const addNewUser = createAsyncThunk(
    ActionTypes.ADD_USER,
    async(userData: AddUserPayload) => {
        try {
            const response = await apiClient.post(API_PATHS.USERS, userData);

            if(response.status !== 200) {
                throw new Error('Error creating user')
            };

            return response.data
        } catch (error) {
            
        }
    }
);

export const editUser = createAsyncThunk(
    ActionTypes.EDIT_USER,
    async({userId, userData}: {userId: number; userData: AddUserPayload}) => {
        try {
            
            const response = await apiClient.put(`${API_PATHS.USERS}/${userId}`, userData);

            if(response.status !== 200) {
                throw new Error('Error creating user')
            };

            return response.data
        } catch (error) {
            
        }
    }
)