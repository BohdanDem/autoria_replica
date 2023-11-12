import { setCurrency } from "./set-currency";
import { dailyUpdateCurrency } from "./update-currency.cron";

export const cronRunner = () => {
  void setCurrency();
  dailyUpdateCurrency.start();
};
