import express from "express";
import {
    createLink,
    GetAllLinks,
    saveLink,
    deleteLink,
    mock
} from "../controller/link.controller";
import { isAutheticated } from "../middleware/auth";

const linkRouter = express.Router();

linkRouter.post("/create", isAutheticated, createLink);

linkRouter.get("/all", isAutheticated, GetAllLinks);

linkRouter.post("/save/:id", isAutheticated, saveLink);

linkRouter.delete("/delete/:id", isAutheticated, deleteLink);

linkRouter.post("/mock", mock);



export default linkRouter;