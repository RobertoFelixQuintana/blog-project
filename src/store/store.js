import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './Features/auth';
import { rtkQueryErrorLogger } from './middleware/errorMiddleware';
import storage from 'redux-persist/lib/storage';
import { usersApi } from './api/usersApi';
import { persistStore, persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore(
  {
    reducer: {
      auth: persistedReducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(rtkQueryErrorLogger)
        .concat(usersApi.middleware),
  },
  composeWithDevTools()
);

setupListeners(store.dispatch);

export const persistor = persistStore(store);
