import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
  userName?: string;
  age?: number;
  genders?: EGenders;
  email: string;
  password: string;
  avatar: string;
  role: string;
  accountType: string;
  postedCarCount: number;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;
