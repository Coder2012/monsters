import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KidType } from '../../components/Kids/types';
import { api } from '../../utils/urls';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  tagTypes: ['Task', 'Kid'],
  endpoints: builder => ({
    getTasks: builder.query<any, void>({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    getKids: builder.query<KidType[], void>({
      query: () => '/kids',
      providesTags: ['Kid'],
    }),
    addKid: builder.mutation({
      query: kid => ({
        url: '/kids',
        method: 'POST',
        body: kid,
      }),
      invalidatesTags: ['Kid'],
    }),
    updateKid: builder.mutation<any, { id: string; body: object }>({
      query: ({ id, body }) => ({
        url: `/kids/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Kid'],
    }),
    addTask: builder.mutation({
      query: task => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetKidsQuery,
  useAddKidMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateKidMutation,
} = apiSlice;
