import { baseApi } from "@/redux/baseApi"

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Sender
    getSentParcels: builder.query({
      query: (params) => ({
        url: "/parcels/my-sent",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),

    createParcel: builder.mutation({
      query: (data) => ({
        url: "/parcels/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    cancelParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // ✅ Receiver
    getReceivedParcels: builder.query({
      query: (params) => ({
        url: "/parcels/my-received",
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


    // ✅ Public
    getParcelByTrackingId: builder.query({
      query: (trackingId) => ({
        url: `/parcels/track/${trackingId}`,
        method: "GET",
      }),
    }),

    // ✅ Admin
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
        url: `/parcels/${parcelId}/toggle-block`,
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
