import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token || '';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lib-api.onrender.com/api' }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: '/getbooks',
        method: "GET",
        // headers: {
        //   "Authorization": `Bearer ${token}`
        // }
      }),
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/getbook/${id}`,
        method: "GET",
        // headers: {
        //   "Authorization": `Bearer ${token}`
        // }
      }),
      providesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, update }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: update,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      invalidatesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useGetAllBooksQuery, useDeleteBookMutation, useGetSingleBookQuery, useUpdateBookMutation, useAddBookMutation } = booksApi;