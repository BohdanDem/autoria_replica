import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

const PORT = 5000;

app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${PORT}`);
});
