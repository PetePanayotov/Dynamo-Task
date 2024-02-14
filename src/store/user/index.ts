import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState, User } from "./interface";
import { addNewUser, editUser, fetchUsers } from "./action";
import { RootState } from "..";

const initialState: UserState = {data: []}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload
        }),
        builder.addCase(addNewUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.data = [...state.data, action.payload]
        }),
        builder.addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
            const userIndex = state.data.findIndex(u => u.id == action.payload.id);

            if(userIndex !== -1) {
                state.data[userIndex] = {...state.data[userIndex], ...action.payload}
            };
        })
    }
});

export const selectUsers = (state: RootState) => state.users.data;

export default userSlice.reducer;