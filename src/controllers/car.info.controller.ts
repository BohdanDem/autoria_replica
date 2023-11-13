import { NextFunction, Request, Response } from "express";

import { carInfoService } from "../services/car.info.service";

class CarInfoController {
  public async getWatchCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const advert = await carInfoService.getWatchCount(id);

      res.status(201).json(advert);
    } catch (e) {
      next(e);
    }
  }
}

export const carInfoController = new CarInfoController();
