import { model, Schema } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ICar } from "../types/car.type";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      enum: EBrand,
    },
    carModel: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
