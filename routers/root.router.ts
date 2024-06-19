import todoRouter from "./todolist.router";
import userRouter from "./user.router";
import express from "express";
const rootRouter = express.Router();

rootRouter.use("/auth", userRouter);
rootRouter.use("/todo", todoRouter);

export default rootRouter;
