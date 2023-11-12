import { CronJob } from "cron";

import { ApiError } from "../errors/api.error";
import { currencyService } from "../services/currency.service";

const updateCurrency = async function () {
  try {
    await currencyService.getAll();
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const dailyUpdateCurrency = new CronJob("0 0 * * * ", updateCurrency);
