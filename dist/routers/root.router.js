"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todolist_router_1 = __importDefault(require("./todolist.router"));
const user_router_1 = __importDefault(require("./user.router"));
const express_1 = __importDefault(require("express"));
const rootRouter = express_1.default.Router();
rootRouter.use("/auth", user_router_1.default);
rootRouter.use("/todo", todolist_router_1.default);
exports.default = rootRouter;
