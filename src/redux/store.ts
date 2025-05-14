import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth-api';
import authReducer from './features/auth-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './api/user';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
