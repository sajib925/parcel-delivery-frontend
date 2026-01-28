import { baseApi } from "@/redux/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["AUTH"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["AUTH"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["AUTH"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getNewAccessToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        data: { refreshToken },
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useGetNewAccessTokenMutation,
  useUserInfoQuery
} = authApi


