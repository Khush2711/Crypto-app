import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': `${process.env.REACT_APP_KEY_TWO}`,
    'X-RapidAPI-Host': `${process.env.REACT_APP_HOST_TWO}`
};

const baseUrl = `${process.env.REACT_APP_URL_TWO}`;

const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath : 'cryptoNewsApi',
    baseQuery : fetchBaseQuery( { baseUrl } ),
    endpoints : (builder)=>({
        getCryptosNews : builder.query({
            query : ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const {
    useGetCryptosNewsQuery,
} = cryptoNewsApi;