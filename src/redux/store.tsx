import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authSlice from './authSlice';
import dashboardSlice from './dashboardSlice';
import generalSlice from './generalSlice';
import pasteSlice from './pasteSlice';


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    auth: authSlice,
    paste: pasteSlice,
    dashboard: dashboardSlice,
    general: generalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
