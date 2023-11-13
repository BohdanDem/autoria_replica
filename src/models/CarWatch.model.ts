import { model, Schema, Types } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ICarWatch } from "../types/car.watch.type";
import { Car } from "./Car.model";

const carWatchSchema = new Schema(
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
    _carId: {
      type: Types.ObjectId,
      required: true,
      ref: Car,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CarWatch = model<ICarWatch>("carWatch", carWatchSchema);
