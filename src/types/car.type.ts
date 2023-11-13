import { Document } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ECurrency } from "../enums/currency.enum";

export interface ICar extends Document {
  brand?: EBrand;
  carModel?: string;
  year?: number;
  price?: number;
  currency?: ECurrency;
  region?: string;
  isActive?: boolean;
  carFullCost: object;
  description?: string;
  _userId?: string;
  avatar?: string;
}
