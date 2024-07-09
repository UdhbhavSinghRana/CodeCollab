import linkModel, { ILink } from "../models/link.model";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import mongoose from "mongoose";

// create link
interface ICreateLink {
  title: string;
  userId: string;
}

export const mock = (req: Request, res: Response) => {
  res.cookie('testing', 'ok')
  res.send("cookie ok")
}

export const createLink = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const userId = req.user?._id || "";

    const link: ICreateLink = {
      title,
      userId: userId as string,
    };

    const newLink = await linkModel.create(link);

    res.status(201).json({ success: true, data: newLink._id });
  }
);

// get all links
export const GetAllLinks = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    const links = await linkModel.find({ userId });

    res.status(200).json({ success: true, data: links });
  }
);

// save link
export const saveLink = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;

    const link = await linkModel.findById(id);

    if (!link) {
      return next(new ErrorHandler("Link not found", 404));
    }

    if (link.userId.toString() !== userId) {
      return next(new ErrorHandler("You are not authorized", 401));
    }

    link.code = req.body.code || "";
    await link.save();

    res.status(200).json({ success: true, data: link });
  }
);

// delete link
export const deleteLink = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;

    const link = await linkModel.findById(id);

    if (!link) {
      return next(new ErrorHandler("Link not found", 404));
    }

    if (link.userId.toString() !== userId) {
      return next(new ErrorHandler("You are not authorized", 401));
    }

    await link.deleteOne();

    res.status(200).json({ success: true, data: {} });
  }
);
