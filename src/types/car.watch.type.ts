import { EBrand } from "../enums/brand.enum";

export interface ICarWatch {
  _carId: string;
  brand: EBrand;
  carModel: string;
}
