import { Document } from "mongoose";

import { EBrand } from "../enums/brand.enum";

export interface ICar extends Document {
  brand?: EBrand;
  carModel?: string;
  year?: number;
}
