import { model, Schema } from "mongoose";

import { ICurrency } from "../types/currency.type";

const currencySchema = new Schema(
  {
    EUR_UAH_buy: {
      type: String,
    },
    EUR_UAH_sale: {
      type: String,
    },
    USD_UAH_buy: {
      type: String,
    },
    USD_UAH_sale: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Currency = model<ICurrency>("currency", currencySchema);
