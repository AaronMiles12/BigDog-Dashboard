import { IEmergencyRequest, IEmergencyRequestExpanded } from "@/store/types/emergencyRequest";
import { Slice, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

interface IEmergencyRequestState {
  list: IEmergencyRequestExpanded[];
  filteredList: IEmergencyRequestExpanded[];
  currentSelectedEmergencyRequest: null | IEmergencyRequestExpanded;
  selectedEmergencyRequests: IEmergencyRequestExpanded[];
  loading: boolean;
  error: string | null;
}

const defaultState: IEmergencyRequestState = {
  list: [] as IEmergencyRequestExpanded[],
  filteredList: [] as IEmergencyRequestExpanded[],
  currentSelectedEmergencyRequest: null as IEmergencyRequestExpanded | null,
  selectedEmergencyRequests: [] as IEmergencyRequestExpanded[],
  loading: true,
  error: null as string | null,
};

const emergencyRequestSlice: Slice<
  IEmergencyRequestState,
  SliceCaseReducers<IEmergencyRequestState>
> = createSlice({
  initialState: defaultState,
  name: "emergencyRequest",
  reducers: {
    setList: (state, action: { payload: IEmergencyRequest[] }) => {
      const emergencyRequests = action.payload.map((emergencyRequest) => {
        const { identifier: email, mobileNumber } = emergencyRequest.requestedBy.auth;
        const identifier = email || mobileNumber;
        return {
          ...emergencyRequest,
          fullName: `${emergencyRequest.requestedBy.firstName} ${emergencyRequest.requestedBy.lastName}`,
          identifier,
        } as IEmergencyRequestExpanded;
      });

      state.list = emergencyRequests.reverse();
      state.filteredList = emergencyRequests.reverse();
    },
    setFilteredList: (state, action: { payload: IEmergencyRequestExpanded[] }) => {
      state.filteredList = action.payload;
    },
    addToList: (state, action: { payload: IEmergencyRequest }) => {
      const { identifier: email, mobileNumber } = action.payload.requestedBy.auth;
      const identifier = email || mobileNumber;
      const emergencyRequest = {
        ...action.payload,
        fullName: `${action.payload.requestedBy.firstName} ${action.payload.requestedBy.lastName}`,
        identifier,
      } as IEmergencyRequestExpanded;
      state.list.push(emergencyRequest);
      state.filteredList.push(emergencyRequest);
    },
    removeFromList: (state, action: { payload: string }) => {
      state.list = state.list.filter((emergencyRequest) => emergencyRequest._id !== action.payload);
      state.filteredList = state.filteredList.filter(
        (emergencyRequest) => emergencyRequest._id !== action.payload,
      );
    },
    setCurrentSelectedEmergencyRequest: (state, action: { payload: IEmergencyRequestExpanded }) => {
      state.currentSelectedEmergencyRequest = action.payload;
    },
    setSelectedEmergencyRequests: (state, action: { payload: IEmergencyRequestExpanded[] }) => {
      state.selectedEmergencyRequests = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
  },
});

export const {
  setList: setEmergencyList,
  setFilteredList: setFilteredEmergencyList,
  addToList: addEmergencyToList,
  removeFromList: removeEmergencyFromList,
  setCurrentSelectedEmergencyRequest,
  setSelectedEmergencyRequests,
  setLoading: setEmergencyLoading,
  setError: setEmergencyError,
} = emergencyRequestSlice.actions;

export default emergencyRequestSlice.reducer;
