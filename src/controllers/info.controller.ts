import { NextFunction, Request, Response } from "express";

import { infoService } from "../services/info.service";

class InfoController {
  public async post(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const brand = req.body.brand;
      const response = await infoService.post(brand);

      res.status(201).json(response.response);
    } catch (e) {
      next(e);
    }
  }
}

export const infoController = new InfoController();
