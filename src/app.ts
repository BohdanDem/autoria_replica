import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import flash from "express-flash";
import session from "express-session";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs/config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { carInfoRouter } from "./routers/car.info.router";
import { carRouter } from "./routers/car.router";
import { infoRouter } from "./routers/info.router";
import { userRouter } from "./routers/user.router";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true }),
);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/info", infoRouter);
app.use("/car_info", carInfoRouter);
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
  cronRunner();
});
