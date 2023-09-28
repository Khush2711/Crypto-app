import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from "../service/cryptoApi";
import { cryptoNewsApi } from '../service/cryptoNewsAPi';

const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cryptoApi.middleware,
            cryptoNewsApi.middleware,
        ),
});


export default store;