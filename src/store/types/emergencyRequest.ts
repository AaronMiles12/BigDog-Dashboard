export interface EmergencyRequestSuccessfulResponse {
  message: string;
  data: IEmergencyRequest[];
  status: boolean;
}

export interface IEmergencyRequest {
  location: Location;
  _id: string;
  requestedBy: RequestedBy;
  status: string;
  chargingType: string;
  statusChangedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IEmergencyRequestExpanded extends IEmergencyRequest {
  fullName: string;
  identifier: string;
  car: Car;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface RequestedBy {
  _id: string;
  auth: Auth;
  firstName: string;
  car: Car;
  lastName: string;
}

export interface Auth {
  _id: string;
  identifier?: string;
  mobileNumber?: string;
}

export interface Car {
  _id: string;
  auth: string;
  user: string;
  make: string;
  model: string;
  year: string;
  about: string;
  __v: number;
}
