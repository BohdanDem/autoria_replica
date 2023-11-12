import { model, Schema, Types } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ICar } from "../types/car.type";
import { User } from "./User.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      enum: EBrand,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    price: {
      type: Number,
    },
    currency: {
      type: String,
    },
    region: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    badWordsCheckCount: {
      type: Number,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
