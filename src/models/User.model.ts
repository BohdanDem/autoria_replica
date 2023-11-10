import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { IUser } from "../types/user.type";

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    role: {
      type: String,
    },
    accountType: {
      type: String,
    },
    age: {
      type: Number,
      min: [18, "Minimum age is 18"],
      max: [120, "Maximum age is 120"],
    },
    genders: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("user", userSchema);
