import { baseApi } from "../redux/api/baseApi";
export const createAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (adminInfo) => ({
        url: "/users/create-admin",
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["admin"],
    }),
    viewAdmin: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const { useCreateAdminMutation, useViewAdminQuery } = createAdminApi;
