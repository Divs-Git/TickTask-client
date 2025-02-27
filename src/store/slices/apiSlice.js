import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const API_URI = 'http://localhost:8080/api';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
