import axios from "axios";

import { ApiError } from "../errors/api.error";
import { Currency } from "../models/Currency.model";

class CurrencyService {
  public async getAll(): Promise<void> {
    try {
      const currency = await this.GetCurrency.getCurrency();

      const EUR_UAH_buy = currency.data[0].buy;
      const EUR_UAH_sale = currency.data[0].sale;
      const USD_UAH_buy = currency.data[1].buy;
      const USD_UAH_sale = currency.data[0].sale;

      const currencyOld = await Currency.findOne({ EUR_UAH_buy });
      if (currencyOld) {
        await Currency.findByIdAndDelete(currencyOld._id);
      }

      await Currency.create({
        EUR_UAH_buy,
        EUR_UAH_sale,
        USD_UAH_buy,
        USD_UAH_sale,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public GetCurrency = {
    getCurrency: async () => {
      return await axios.get(
        "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5",
      );
    },
  };
}

export const currencyService = new CurrencyService();
