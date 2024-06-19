import express, { Express } from "express";
import path from "path";
import rootRouter from "./routers/root.router";
import { NODE_ENV } from "./utils/env";
const config = require("./config/config.json")[NODE_ENV || "development"];

const app: Express = express();
app.use(express.json());

const pathPublicDirectory = path.join(__dirname, "./public");

app.use("/public", express.static(pathPublicDirectory));
app.use("/api", rootRouter);

app.listen(config.serverPort, () => {
  console.log(`App listening at http://localhost:${config.serverPort}`);
});
