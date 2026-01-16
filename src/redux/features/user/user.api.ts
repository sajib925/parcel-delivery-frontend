import { baseApi } from "@/redux/baseApi"

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    toggleBlockUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/toggle-block`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
})

export const { useGetAllUsersQuery, useToggleBlockUserMutation, useDeleteUserMutation } = userApi
