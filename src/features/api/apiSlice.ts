import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Task', 'Kid'],
  endpoints: builder => ({
    getTasks: builder.query<any, void>({
      query: () => '/tasks',
      providesTags: ['Task']
    }),
    getKids: builder.query<any, void>({
      query: () => '/kids',
      providesTags: ['Kid']
    }),
    addKid: builder.mutation({
      query: kid => ({
        url: '/kids',
        method: 'POST',
        body: kid
      }),
      invalidatesTags: ['Kid']
    }),
    addTask: builder.mutation({
      query: task => ({
        url: '/tasks',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task']
    })
  })
})

export const { useGetTasksQuery, useGetKidsQuery, useAddKidMutation, useAddTaskMutation } = apiSlice