// apiConfig.ts
import api from './baseQuery';

export const baseApi = api.injectEndpoints({
  endpoints: (builder) => ({}) // You can add more endpoints here if needed
});
