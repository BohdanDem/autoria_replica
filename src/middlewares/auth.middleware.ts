import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenService.checkToken(accessToken, "access");

      const entity = await tokenRepository.findOne({ accessToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenService.checkToken(refreshToken, "refresh");

      const entity = await tokenRepository.findOne({ refreshToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      req.res.locals.tokenPayload = payload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkPermissionToManageByRole(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.res.locals.tokenPayload;
        const allowedArray = [...allowedRoles];
        const permission = allowedArray
          .map((item) => item === payload.role)
          .find((item) => item === true);

        if (!permission) {
          throw new ApiError("Access denied!", 403);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public checkPermissionToManageByRoleOrId(
    id: string,
    ...allowedRoles: string[]
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const Id = req.params[id];
        const payload = req.res.locals.tokenPayload;

        const allowedArray = [...allowedRoles];
        const rolePermission = allowedArray
          .map((item) => item === payload.role)
          .find((item) => item === true);
        const idPermission = Id === payload.userId;

        if (!(rolePermission || idPermission)) {
          throw new ApiError("Access denied!", 403);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public checkAccessByAccountType(...allowedAccountType: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.res.locals.tokenPayload;

        if (!(payload.role === "admin" || payload.role === "manager")) {
          const allowedArray = [...allowedAccountType];
          const permission = allowedArray
            .map((item) => item === payload.accountType)
            .find((item) => item === true);

          if (!permission) {
            throw new ApiError(
              "Access denied! Please buy the premium account to get this info",
              403,
            );
          }
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
