import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import linkRouter from "./routes/link.route";
import { ErrorMiddleware } from "./middleware/error";

export const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies from cross-origin requests
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api", userRouter, linkRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "API is working!" });
});

// Handle 404 errors
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.statusCode = 404;
  next(err);
});

// Error middleware
app.use(ErrorMiddleware);

export default app;
