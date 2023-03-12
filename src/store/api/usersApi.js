import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { message } from 'antd';

import secureLocalStorage from 'react-secure-storage';

const getDefaultCredentials = () => {
  const headers = {
    Authorization: '',
  };

  const session = secureLocalStorage.getItem('@@session');

  if (session) {
    const token = session.token;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

const baseUrl = 'http://localhost:3001/api/';
// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    postData: builder.mutation({
      query: ({ params, body }) => ({
        url: `${baseUrl}/${params}`,
        method: 'POST',
        body,
        headers: getDefaultCredentials(),
      }),
      transformResponse: (response) => {
        if (!response.error) {
          message.success(response?.message);
        }
        return response;
      },
    }),
    deleteData: builder.mutation({
      query: ({ params, body }) => ({
        url: `${baseUrl}/${params}`,
        method: 'DELETE',
        body,
        headers: getDefaultCredentials(),
      }),
      transformResponse: (response) => {
        if (!response.error) {
          message.success(response?.message);
        }
        return response;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostDataMutation, useDeleteDataMutation } = usersApi;
