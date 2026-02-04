import { baseApi } from "@/redux/baseApi"

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: `/contact/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["CONTACTS"],
    }),

    getAllContacts: builder.query({
      query: () => ({
        url: `/contact/get`,
        method: "GET",
      }),
      providesTags: ["CONTACTS"],
    }),
  }),
})

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
} = contactApi
