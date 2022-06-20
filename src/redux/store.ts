import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authSlice from './authSlice';
import dashboardSlice from './dashboardSlice';
import generalSlice from './generalSlice';
import pasteSlice from './pasteSlice';


export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    auth: authSlice,
    paste: pasteSlice,
    dashboard: dashboardSlice,
    general: generalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
