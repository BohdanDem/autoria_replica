import { NextFunction, Request, Response } from "express";

import { carInfoService } from "../services/car.info.service";

class CarInfoController {
  public async getWatchCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const watch = await carInfoService.getWatchCount(id);

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
      const avgPrice = await carInfoService.getMiddleCarPriceByRegion(
        req.body.region,
      );

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
      const avgPrice = await carInfoService.getMiddleCarPriceByCountry();

      res.status(201).json(avgPrice);
    } catch (e) {
      next(e);
    }
  }
}

export const carInfoController = new CarInfoController();
