import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token || '';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lib-api.onrender.com/api/auth' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query: (data) => ({
          url: "/register",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["auth"],
      }), 
    logInUser: builder.mutation({
        query: (data) => ({
          url: "/login",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["auth"],
      }), 
    logOutUser: builder.query({
        query: () => '/logout',
        invalidatesTags: ["auth"],
      }), 
      loggedinStatus: builder.query({
        query: () => ({
          url: '/loggedinstatus',
          method: 'GET',
          // headers: {
          //   'Authorization': `Bearer ${token}}`
          // }
        }),
        invalidatesTags: ['auth'],
      }), 
    }),
});

export const { useRegisterUserMutation, useLogInUserMutation, useLogOutUserQuery, useLoggedinStatusQuery } = authApi;