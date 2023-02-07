import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './Features/auth';
import { rtkQueryErrorLogger } from './middleware/errorMiddleware';
import { usersApi } from './api/usersApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(rtkQueryErrorLogger)
        .concat(usersApi.middleware),
  },
  composeWithDevTools()
);

setupListeners(store.dispatch);
