import { Router } from "express";

import { accountType } from "../configs/account.type";
import { roles } from "../configs/role";
import { carInfoController } from "../controllers/car.info.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { QueryValidator } from "../validators/query.validator";

const router = Router();

router.get(
  "/middle_car_price_by_region",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(
    roles.ADMIN,
    roles.MANAGER,
    roles.SELLER,
  ),
  authMiddleware.checkAccessByAccountType(accountType.PREMIUM),
  carInfoController.getMiddleCarPriceByRegion,
);

router.get(
  "/middle_car_price_by_country",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(
    roles.ADMIN,
    roles.MANAGER,
    roles.SELLER,
  ),
  authMiddleware.checkAccessByAccountType(accountType.PREMIUM),
  carInfoController.getMiddleCarPriceByCountry,
);

router.get(
  "/watch/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(
    roles.ADMIN,
    roles.MANAGER,
    roles.SELLER,
  ),
  authMiddleware.checkAccessByAccountType(accountType.PREMIUM),
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isQueryValid(QueryValidator.queryCarWatch),
  carInfoController.getWatchCount,
);

export const carInfoRouter = router;
