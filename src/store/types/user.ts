export interface GetAllUsersSuccessResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export interface IUser {
  _id: string;
  auth: Auth;
  firstName: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  description: string;
  bio: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  car?: Car;
  dateOfBirth?: string;
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
