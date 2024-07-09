import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import linkRouter from "./routes/link.route";
import { ErrorMiddleware } from "./middleware/error";

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api", userRouter, linkRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "Api is working!" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);