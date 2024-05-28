import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    registration: builder.mutation({
      query: (normalUser) => ({
        url: "/users/create-User",
        method: "POST",
        body: normalUser,
      }),
      invalidatesTags: ["normalUser"],
    }),
    viewNormalUsers: builder.query({
      query: () => ({
        url: "/normalUsers",
        method: "GET",
      }),
      providesTags: ["normalUser"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useViewNormalUsersQuery,
} = authApi;
