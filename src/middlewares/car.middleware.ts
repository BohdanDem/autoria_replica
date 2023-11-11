import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ITokenPayload } from "../types/token.types";

class CarMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const car = await carRepository.findById(id);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      req.res.locals = car;

      next();
    } catch (e) {
      next(e);
    }
  }

  public checkPermissionToManageCarByRoleOrId(
    id: string,
    ...allowedRoles: string[]
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId, role } = req.res.locals.tokenPayload as ITokenPayload;
        const Id = req.params[id];

        const car = await carRepository.getOneByParams({
          _userId: userId,
          _id: Id,
        });

        const allowedArray = [...allowedRoles];
        const rolePermission = allowedArray
          .map((item) => item === role)
          .find((item) => item === true);

        if (!(rolePermission || car)) {
          throw new ApiError("Access denied! You can't manage this car", 403);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const carMiddleware = new CarMiddleware();
