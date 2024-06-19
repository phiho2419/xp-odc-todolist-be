"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const root_router_1 = __importDefault(require("./routers/root.router"));
const env_1 = require("./utils/env");
const config = require("./config/config.json")[env_1.NODE_ENV || "development"];
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pathPublicDirectory = path_1.default.join(__dirname, "./public");
app.use("/public", express_1.default.static(pathPublicDirectory));
app.use("/api", root_router_1.default);
app.listen(config.serverPort, () => {
    console.log(`App listening at http://localhost:${config.serverPort}`);
});
