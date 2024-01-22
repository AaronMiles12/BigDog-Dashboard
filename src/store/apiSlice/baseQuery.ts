// api.ts
import { getCookie } from "@/utils/getCookies";
import { coreModuleName } from "@reduxjs/toolkit/dist/query/core/module";
import { reactHooksModuleName } from "@reduxjs/toolkit/dist/query/react/module";
import {
  Api,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  // baseUrl: "https://3.136.159.28/big-dog-api/",
  baseUrl: "https://bigdog.thecloudlearner.com/",
  prepareHeaders: (headers, { getState }) => {
    // You can add default headers here
    const authToken = getCookie("authToken")?.replace("=", "");
    const refreshToken = getCookie("refreshToken")?.replace("=", "");
    if (authToken && refreshToken) {
      headers.append("Authorization", `${authToken}`);
      headers.append("refreshToken", `${refreshToken}`);
      headers.append("devicetoken", "deviceToken");
      headers.append("userType", "Admin");
    }
    headers.append("Access-Control-Allow-Origin", "https://bigdog.thecloudlearner.com/");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return headers;
  },
  validateStatus: (response) => {
    return response.status >= 200 && response.status < 300; // default
  },
});

const api: Api<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  {},
  "api",
  never,
  typeof coreModuleName | typeof reactHooksModuleName
> = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
export default api;
