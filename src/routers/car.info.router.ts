import { Router } from "express";

import { roles } from "../configs/role";
import { carInfoController } from "../controllers/car.info.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get(
  "/watch/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(
    roles.ADMIN,
    roles.MANAGER,
    roles.SELLER,
  ),
  commonMiddleware.isIdValid("id"),
  carInfoController.getWatchCount,
);

export const carInfoRouter = router;
