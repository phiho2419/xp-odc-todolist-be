"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../utils/env");
const date_1 = require("../utils/date");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const authenticate = (req, res, next) => {
    try {
        const token = req.header("token");
        const decode = (jsonwebtoken_1.default.verify(token || "", env_1.SECRETKEY_TOKEN));
        if (decode.exp && decode.exp < (0, date_1.getTimeStampSecond)()) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Token is expired !",
            }));
        }
        const { email, userRole, id } = decode;
        req.body = Object.assign(Object.assign({}, req.body), { email, userRole, userId: id });
        next();
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            message: "Invalid token",
        }));
    }
};
exports.authenticate = authenticate;
