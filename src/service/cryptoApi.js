import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
    'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY_ONE}`,
    'X-RapidAPI-Host': `${process.env.REACT_APP_HOST_ONE}`
}

const baseUrl = `${process.env.REACT_APP_URL_ONE}`;

const createRequest = (url) => ({url, headers: cryptoApiHeader});

export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery : fetchBaseQuery( { baseUrl } ),
    endpoints : (builder)=>({
        getCryptos : builder.query({
            query : (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptosDetails : builder.query({
            query : (id) => createRequest(`/coin/${id}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          })
    })
})

export const {
    useGetExchangesQuery,
    useGetCryptosQuery,
    useGetCryptosDetailsQuery
} = cryptoApi;