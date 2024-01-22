import { faker } from '@faker-js/faker';
import { uniqueId } from 'lodash';
import { IUser } from '../types/user';

// export class User implements IUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   Image: string;
//   otpVerified: boolean;
//   userVerified: boolean;
//   userType: string;
//   isActive: boolean;
//   userDisabled: boolean;

//   constructor({
//     _id,
//     fullName,
//     email,
//     phoneNumber,
//     Image,
//     otpVerified,
//     userVerified,
//     userType,
//     isActive,
//     userDisabled
//   }: IUser) {
//     this._id = _id;
//     this.fullName = fullName;
//     this.email = email;
//     this.phoneNumber = phoneNumber;
//     this.Image = Image === '' ? 'https://via.placeholder.com/150' : Image;
//     this.otpVerified = otpVerified;
//     this.userVerified = userVerified;
//     this.userType = userType;
//     this.isActive = isActive;
//     this.userDisabled = userDisabled;
//   }
// }

// export class FakeUser extends User {
//   constructor() {
//     const _id = uniqueId();
//     const fullName = faker.person.fullName();
//     const email = faker.internet.email();
//     const phoneNumber = faker.phone.number();
//     const Image = faker.image.avatar();
//     const otpVerified = faker.datatype.boolean();
//     const userVerified = faker.datatype.boolean();
//     const userType = faker.helpers.arrayElement(['parent', 'child']);
//     const isActive = faker.datatype.boolean();
//     const userDisabled = faker.datatype.boolean();
//     const otpEmail = faker.internet.email();

//     super({
//       _id,
//       fullName,
//       email,
//       phoneNumber,
//       Image,
//       otpVerified,
//       userVerified,
//       userType,
//       isActive,
//       userDisabled
//     });
//   }
// }

// list of fake users

// export const fakeUsers: FakeUser[] = [];

// for (let i = 0; i < 10; i++) {
//   fakeUsers.push(new FakeUser());
// }
