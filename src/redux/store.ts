import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth-api';
import authReducer from './features/auth-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './api/user';
import { taskApi } from './api/task';
import { chatApi } from './api/chat';
import { productApi } from './api/product';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(taskApi.middleware)
      .concat(productApi.middleware)
      .concat(chatApi.middleware),
  
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
