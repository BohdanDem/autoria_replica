import { EBrand } from "../enums/brand.enum";
import { ECurrency } from "../enums/currency.enum";

export interface ICarWatch {
  _carId: string;
  brand: EBrand;
  carModel: string;
}

export interface ICarPrice {
  region: string;
  currency: ECurrency;
}
