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
const constants_1 = require("../constants");
const todolist_controller_1 = require("../controllers/todolist.controller");
const verify_token_middleware_1 = require("../middlewares/verify-token.middleware");
const utils_1 = require("../utils");
const todoRouter = express_1.default.Router();
todoRouter.post("/addToDo", verify_token_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTodo = { title, description, status: "todo" };
        yield (0, todolist_controller_1.createTodo)(newTodo);
        res.status(constants_1.RESPONSE_CODE.OK).send((0, utils_1.apiResponse)({
            data: newTodo,
            status: constants_1.RESPONSE_CODE.OK,
            message: "Add Todo successfully !",
        }));
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            error: error,
            message: "Add Todo fail !",
        }));
    }
}));
todoRouter.get("/getList", verify_token_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoList = yield (0, todolist_controller_1.getTodoList)();
        res.status(constants_1.RESPONSE_CODE.OK).send((0, utils_1.apiResponse)({
            data: todoList,
            status: constants_1.RESPONSE_CODE.OK,
            message: "Get successfully !",
        }));
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            error: error,
            message: "Get fail !",
        }));
    }
}));
todoRouter.get("/getDetails/:id", verify_token_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield (0, todolist_controller_1.getTodoById)(req.params.id);
        if (!movie) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Not found !",
            }));
        }
        res.status(constants_1.RESPONSE_CODE.OK).send((0, utils_1.apiResponse)({
            data: movie,
            status: constants_1.RESPONSE_CODE.OK,
            message: "Get successfully !",
        }));
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            message: "Not found !",
            error,
        }));
    }
}));
todoRouter.delete("/delete/:id", verify_token_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield (0, todolist_controller_1.getTodoById)(id);
        if (!movie) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Not found !",
            }));
        }
        yield (0, todolist_controller_1.deleteTodoById)(id);
        res.status(constants_1.RESPONSE_CODE.OK).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.OK,
            message: "Deleted successfully !",
        }));
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            message: "Not found !",
            error,
        }));
    }
}));
todoRouter.put("/update/:id", verify_token_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield (0, todolist_controller_1.getTodoById)(id);
        if (!movie) {
            return res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
                status: constants_1.RESPONSE_CODE.BAD_REQUEST,
                message: "Todo not found !",
            }));
        }
        const { title, description, status } = req.body;
        const updatePayload = {
            title,
            description,
            status,
        };
        yield (0, todolist_controller_1.updateTodoById)(id, updatePayload);
        res.status(constants_1.RESPONSE_CODE.OK).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.OK,
            message: "Updated successfully !",
            data: updatePayload,
        }));
    }
    catch (error) {
        res.status(constants_1.RESPONSE_CODE.BAD_REQUEST).send((0, utils_1.apiResponse)({
            status: constants_1.RESPONSE_CODE.BAD_REQUEST,
            error,
            message: "Update fail !",
        }));
    }
}));
exports.default = todoRouter;
