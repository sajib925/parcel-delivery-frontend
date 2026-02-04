import { baseApi } from "@/redux/baseApi"

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a review for a parcel
    createReview: builder.mutation({
      query: ({ parcelId, data }) => ({
        url: `/review/${parcelId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["REVIEWS"],
    }),

    // Get all reviews (no user required)
    getAllReviews: builder.query({
      query: () => ({
        url: `/review/all`,
        method: "GET",
      }),
      providesTags: ["REVIEWS"],
    }),
  }),
})

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} = reviewApi
