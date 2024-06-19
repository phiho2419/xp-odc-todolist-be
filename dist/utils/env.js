"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRETKEY_TOKEN = exports.NODE_ENV = void 0;
require("dotenv").config();
exports.NODE_ENV = process.env.NODE_ENV;
exports.SECRETKEY_TOKEN = process.env.SECRETKEY_TOKEN || "";
