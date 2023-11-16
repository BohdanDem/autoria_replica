import { NextFunction, Request, Response } from "express";

import { carInfoService } from "../services/car.info.service";
import { IQuery } from "../types/pagination.type";

class CarInfoController {
  public async getWatchCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const watch = await carInfoService.getWatchCount(
        id,
        req.query as unknown as IQuery,
      );

      res.status(201).json(watch);
    } catch (e) {
      next(e);
    }
  }

  public async getMiddleCarPriceByRegion(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const avgPrice = await carInfoService.getMiddleCarPriceByRegion(req.body);

      res.status(201).json(avgPrice);
    } catch (e) {
      next(e);
    }
  }

  public async getMiddleCarPriceByCountry(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const avgPrice = await carInfoService.getMiddleCarPriceByCountry(
        req.body.currency,
      );

      res.status(201).json(avgPrice);
    } catch (e) {
      next(e);
    }
  }
}

export const carInfoController = new CarInfoController();
