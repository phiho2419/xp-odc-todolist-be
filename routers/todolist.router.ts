import express, { Request, Response } from "express";
import { RESPONSE_CODE } from "../constants";
import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodoList,
  updateTodoById,
} from "../controllers/todolist.controller";
import { authenticate } from "../middlewares/verify-token.middleware";
import { apiResponse } from "../utils";
const todoRouter = express.Router();

todoRouter.post(
  "/addToDo",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const newTodo = { title, description, status: "todo" };
      await createTodo(newTodo);
      res.status(RESPONSE_CODE.OK).send(
        apiResponse({
          data: newTodo,
          status: RESPONSE_CODE.OK,
          message: "Add Todo successfully !",
        })
      );
    } catch (error) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          error: error,
          message: "Add Todo fail !",
        })
      );
    }
  }
);

todoRouter.get(
  "/getList",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const todoList = await getTodoList();
      res.status(RESPONSE_CODE.OK).send(
        apiResponse({
          data: todoList,
          status: RESPONSE_CODE.OK,
          message: "Get successfully !",
        })
      );
    } catch (error) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          error: error,
          message: "Get fail !",
        })
      );
    }
  }
);

todoRouter.get(
  "/getDetails/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const movie = await getTodoById(req.params.id);
      if (!movie) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).send(
          apiResponse({
            status: RESPONSE_CODE.BAD_REQUEST,
            message: "Not found !",
          })
        );
      }
      res.status(RESPONSE_CODE.OK).send(
        apiResponse({
          data: movie,
          status: RESPONSE_CODE.OK,
          message: "Get successfully !",
        })
      );
    } catch (error) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Not found !",
          error,
        })
      );
    }
  }
);

todoRouter.delete(
  "/delete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const movie = await getTodoById(id);
      if (!movie) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).send(
          apiResponse({
            status: RESPONSE_CODE.BAD_REQUEST,
            message: "Not found !",
          })
        );
      }
      await deleteTodoById(id);
      res.status(RESPONSE_CODE.OK).send(
        apiResponse({
          status: RESPONSE_CODE.OK,
          message: "Deleted successfully !",
        })
      );
    } catch (error) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Not found !",
          error,
        })
      );
    }
  }
);

todoRouter.put(
  "/update/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const movie = await getTodoById(id);
      if (!movie) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).send(
          apiResponse({
            status: RESPONSE_CODE.BAD_REQUEST,
            message: "Todo not found !",
          })
        );
      }
      const { title, description, status } = req.body;

      const updatePayload = {
        title,
        description,
        status,
      };
      await updateTodoById(id, updatePayload);
      res.status(RESPONSE_CODE.OK).send(
        apiResponse({
          status: RESPONSE_CODE.OK,
          message: "Updated successfully !",
          data: updatePayload,
        })
      );
    } catch (error) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          error,
          message: "Update fail !",
        })
      );
    }
  }
);

export default todoRouter;
