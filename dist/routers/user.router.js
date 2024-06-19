"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_controller_1 = require("../controllers/user.controller");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const validation_1 = require("../utils/validation");
const jwt_helper_1 = require("../helpers/jwt.helper");
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const checkEmail = (0, validation_1.validateEmail)(email);
        if (!checkEmail) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Invalid email format !",
            }));
        }
        if (!password || String(password).length < 6) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Invalid password format ! At least 6 characters",
            }));
        }
        const isExisted = yield (0, user_controller_1.getUserByEmail)(email);
        if (isExisted) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Email already existed !!",
            }));
        }
        const salt = bcryptjs_1.default.genSaltSync();
        const hasPassword = bcryptjs_1.default.hashSync(password, salt);
        const newUser = {
            email,
            password: hasPassword,
            userRole: "user",
        };
        const user = yield (0, user_controller_1.createUser)(newUser);
        const userResponse = JSON.parse(JSON.stringify(user));
        delete userResponse.password;
        res.status(constants_1.RESPONSE_CODE.CREATED).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.CREATED,
            message: "Signup successfully !",
            data: userResponse,
        }));
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            message: "Signup fail !",
            error,
        }));
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_controller_1.getUserByEmail)(email);
        const isAuth = bcryptjs_1.default.compareSync(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!isAuth) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Wrong credentials !",
            }));
        }
        const token = (0, jwt_helper_1.generateToken)(user);
        const userResponse = JSON.parse(JSON.stringify(user));
        delete userResponse.password;
        return res.status(constants_1.RESPONSE_CODE.OK).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.OK,
            message: "Login successfully!",
            data: { user: userResponse, token },
        }));
    }
    catch (error) {
        return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            message: "Wrong credentials !",
            error,
        }));
    }
}));
exports.default = userRouter;
