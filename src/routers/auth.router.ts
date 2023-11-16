import { Router } from "express";

import { roles } from "../configs/role";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register/admin",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isEmailUniq,
  authController.register,
);

router.post(
  "/register/manager",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPermissionToManageByRole(roles.ADMIN),
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isEmailUniq,
  authController.register,
);

router.post(
  "/register/seller_base",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isEmailUniq,
  authController.register,
);

router.post(
  "/register/seller_premium",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isEmailUniq,
  authController.register,
);

router.post(
  "/register/buyer",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isEmailUniq,
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.login,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
