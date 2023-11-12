import { Router } from "express";

import { infoController } from "../controllers/info.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/add_new_car_brand",
  authMiddleware.checkAccessToken,
  infoController.post,
);

export const infoRouter = router;
