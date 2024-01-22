import { getCookie } from "@/utils/getCookies";
import api from "../baseQuery";

interface ISuccessResponse {
  success: true;
  message: string;
  data: SuccessData;
}

export interface SuccessData {
  authToken: string;
  refreshToken: string;
}
export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => {
        return {
          url: "login_admin",
          method: "POST",
          body: {
            email,
            password,
          },
        };
      },
      transformResponse(baseQueryReturnValue, meta, arg) {
        const { data } = baseQueryReturnValue as ISuccessResponse;
        if (data) {
          return data;
        }
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        const { data } = baseQueryReturnValue;
        if (data) {
          return data;
        }
        return baseQueryReturnValue;
      },
    }),
    tokenValidate: builder.query({
      query: () => {
        return {
          url: "tokenValid",
          method: "GET",
          headers: {
            "Content-Type": "application/json|text/plain",
            Authorization: getCookie("authToken") || "",
            refreshToken: getCookie("refreshToken") || "",
            devicetoken: "deviceToken",
            userType: "Admin",
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});
export const { useLoginMutation } = AuthApi;

// export const { useGetAllUsersQuery, useDeleteUserMutation } = AuthApi;

export default AuthApi.endpoints;
