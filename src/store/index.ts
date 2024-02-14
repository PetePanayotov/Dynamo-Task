import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './user';
import layoutReducer from './layout';
import dashboardReducer from './dashboard'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    layout: layoutReducer,
    dashboard: dashboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;