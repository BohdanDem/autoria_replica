import joi from "joi";

import { ECarWatchSort } from "../enums/car.watch.sort.enum";

export class QueryValidator {
  static limit = joi.number().default(10);
  static page = joi.number().default(1);
  static sortedBy = joi.string().default("createdAt");
  static sort = joi.valid(...Object.values(ECarWatchSort));

  static query = joi.object({
    limit: this.limit,
    page: this.page,
    sortedBy: this.sortedBy,
  });

  static queryCarWatch = joi.object({
    sort: this.sort,
  });
}
