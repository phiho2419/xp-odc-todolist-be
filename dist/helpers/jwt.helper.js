"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const env_1 = require("../utils/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        userRole: user.userRole,
    };
    const token = jsonwebtoken_1.default.sign(payload, env_1.SECRETKEY_TOKEN, {
        expiresIn: "24h",
    });
    return token;
};
exports.generateToken = generateToken;
