import api from "../baseQuery";
import { IUser } from "@/store/types/user";

const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "get_all_users",
      transformResponse(baseQueryReturnValue, meta, arg) {
        const { data } = baseQueryReturnValue as { data: IUser[] | [] };
        if (data) {
          return data;
        }
        return baseQueryReturnValue;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  // Other generated hooks and endpoints
} = UserApi;

export default UserApi.endpoints;
