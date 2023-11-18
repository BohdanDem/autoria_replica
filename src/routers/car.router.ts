import { Router } from "express";

import { roles } from "../configs/role";
import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/files.middleware";
import { CarValidator } from "../validators/car.validator";
import { QueryValidator } from "../validators/query.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isQueryValid(QueryValidator.queryCarWatch),
  carController.getAll,
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(
    roles.ADMIN,
    roles.MANAGER,
    roles.SELLER,
  ),
  commonMiddleware.isBodyValid(CarValidator.create),
  commonMiddleware.checkCarPostBadWords,
  carController.post,
);

router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);

router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  carMiddleware.checkPermissionToManageCarByRoleOrId(
    "id",
    roles.ADMIN,
    roles.MANAGER,
  ),
  commonMiddleware.isIdValid("id"),
  carController.delete,
);

router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  carMiddleware.checkPermissionToManageCarByRoleOrId(
    "id",
    roles.ADMIN,
    roles.MANAGER,
  ),
  commonMiddleware.isIdValid("id"),
  carMiddleware.getByIdOrThrow,
  commonMiddleware.isBodyValid(CarValidator.update),
  commonMiddleware.checkCarUpdateBadWords,
  carController.put,
);

router.post(
  "/:id/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isAvatarValid,
  carController.uploadAvatar,
);

export const carRouter = router;
