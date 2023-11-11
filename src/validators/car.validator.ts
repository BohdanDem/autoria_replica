import joi from "joi";

import { EBrand } from "../enums/brand.enum";
import { ECurrency } from "../enums/currency.enum";

export class CarValidator {
  static brand = joi.valid(...Object.values(EBrand));
  static carModel = joi.string().min(2).max(30).trim();
  static year = joi.number().min(1990).max(2023);
  static price = joi.number().min(0);
  static currency = joi.valid(...Object.values(ECurrency));
  static region = joi.string().min(2).max(50).trim();
  static description = joi.string().min(10).max(300).trim();

  static create = joi.object({
    brand: this.brand.required(),
    carModel: this.carModel.required(),
    year: this.year,
    price: this.price.required(),
    currency: this.currency.required(),
    region: this.region,
    description: this.description.required(),
  });

  static update = joi.object({
    price: this.price,
    currency: this.currency,
    region: this.region,
    description: this.description,
  });
}
