import { Document } from "mongoose";

export interface ICurrency extends Document {
  EUR_UAH_buy: string;
  EUR_UAH_sale: string;
  USD_UAH_buy: string;
  USD_UAH_sale: string;
}
