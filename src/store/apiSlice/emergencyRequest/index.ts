import { IEmergencyRequest } from "@/store/types/emergencyRequest";
import api from "../baseQuery";

const emergencyRequestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmergencyRequests: builder.query({
      query: () => "get_emergency_requests",
      transformResponse(baseQueryReturnValue) {
        const { data } = baseQueryReturnValue as { data: IEmergencyRequest[] | [] };
        if (data) {
          return data;
        }
        return baseQueryReturnValue;
      },
    }),
    getAcceptedEmergencyRequests: builder.query({
      query: () => "get_accepted_emergency_requests",
      transformResponse(baseQueryReturnValue) {
        const { data } = baseQueryReturnValue as { data: IEmergencyRequest[] | [] };
        if (data) {
          return data;
        }
        return baseQueryReturnValue;
      },
    }),
  }),
});

export const {
  useGetAllEmergencyRequestsQuery,
  useLazyGetAllEmergencyRequestsQuery,
  useLazyGetAcceptedEmergencyRequestsQuery,
} = emergencyRequestApi;

export default emergencyRequestApi.endpoints;
