import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["AUTH", "PARCEL", "USER", "REVIEWS", "CONTACTS"],
  endpoints: () => ({}),
});
