import { apiSlice } from '../apiSlice';

const AUTH_URL = '/user';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

// console.log(apiSlice);

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;

// console.log(authApiSlice);
// console.log(authApiSlice.useLoginMutation);
