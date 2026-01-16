import { baseApi } from "@/redux/baseApi"

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Sender endpoints
    createParcel: builder.mutation({
      query: (data) => ({
        url: "/parcels/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getSentParcels: builder.query({
      query: (params) => ({
        url: "/parcels/sent",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),

    cancelParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Receiver endpoints
    getReceivedParcels: builder.query({
      query: (params) => ({
        url: "/parcels/received",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),

    confirmDelivery: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/confirm-delivery`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Public endpoint
    getParcelByTrackingId: builder.query({
      query: (trackingId) => ({
        url: `/parcels/track/${trackingId}`,
        method: "GET",
      }),
    }),

    // Admin endpoints
    getAllParcels: builder.query({
      query: (params) => ({
        url: "/parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ parcelId, ...data }) => ({
        url: `/parcels/${parcelId}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    blockParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
})

export const {
  useCreateParcelMutation,
  useGetSentParcelsQuery,
  useCancelParcelMutation,
  useGetReceivedParcelsQuery,
  useConfirmDeliveryMutation,
  useGetParcelByTrackingIdQuery,
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
} = parcelApi
