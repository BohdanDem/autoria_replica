import { ApiError } from "../errors/api.error";
import { currencyService } from "../services/currency.service";

export const setCurrency = async function () {
  try {
    await currencyService.getAll();
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};
