import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { carPresenter } from "../presenters/car.presenter";
import { carService } from "../services/car.service";
import { ICar } from "../types/car.type";
import { IQuery } from "../types/pagination.type";
import { ITokenPayload } from "../types/token.types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll(req.query as unknown as IQuery);

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async post(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const createdCar = await carService.post(req.body, userId);
      const warning = res.locals.warning;

      res.status(201).json({ warning, createdCar });
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const car = await carService.getCar(id);
      const response = carPresenter.present(car);

      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await carService.delete(id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const car = await carService.put(id, req.body);
      const warning = res.locals.warning;

      res.status(201).json({ warning, car });
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { id } = req.params;
      const avatar = req.files.avatar as UploadedFile;
      const car = await carService.uploadAvatar(avatar, id);
      const response = carPresenter.present(car);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
