import { Router } from "express";

import { roles } from "../configs/role";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/files.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { QueryValidator } from "../validators/query.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(roles.ADMIN, roles.MANAGER),
  commonMiddleware.isQueryValid(QueryValidator.query),
  userController.getAll,
);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(roles.ADMIN, roles.MANAGER),
  commonMiddleware.isIdValid("id"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRoleOrId(
    "id",
    roles.ADMIN,
    roles.MANAGER,
  ),
  commonMiddleware.isIdValid("id"),
  userController.delete,
);

router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRoleOrId(
    "id",
    roles.ADMIN,
    roles.MANAGER,
  ),
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.put,
);

router.post(
  "/:id/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar,
);

export const userRouter = router;
