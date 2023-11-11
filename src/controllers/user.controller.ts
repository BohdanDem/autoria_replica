import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IQuery } from "../types/pagination.type";
import { ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll(req.query as unknown as IQuery);

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;
      const user = await userService.getUser(userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { id } = req.params;
      await userService.delete(id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.put(id, req.body);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
