import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";

const app = express();

const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json("hello");
});

app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${PORT}`);
});
