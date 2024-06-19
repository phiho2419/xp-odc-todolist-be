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
import { body, validationResult } from "express-validator";
const todoRouter = express.Router();

todoRouter.post(
  "/addToDo",
  authenticate,
  [body("title", "Invalid does not Empty").not().isEmpty()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).json(
          apiResponse({
            status: RESPONSE_CODE.BAD_REQUEST,
            message: "",
            error: errors,
          })
        );
      }

      const { title, description } = req.body;
      if (!title) {
      }
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
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(
        apiResponse({
          status: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          error: error,
          message: "INTERNAL_SERVER_ERROR",
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
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(
        apiResponse({
          status: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          error: error,
          message: "INTERNAL_SERVER_ERROR",
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
        return res.status(RESPONSE_CODE.NOT_FOUND).send(
          apiResponse({
            status: RESPONSE_CODE.NOT_FOUND,
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
      res.status(RESPONSE_CODE.NOT_FOUND).send(
        apiResponse({
          status: RESPONSE_CODE.NOT_FOUND,
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
        return res.status(RESPONSE_CODE.NOT_FOUND).send(
          apiResponse({
            status: RESPONSE_CODE.NOT_FOUND,
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
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(
        apiResponse({
          status: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          message: "INTERNAL_SERVER_ERROR",
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
        return res.status(RESPONSE_CODE.NOT_FOUND).send(
          apiResponse({
            status: RESPONSE_CODE.NOT_FOUND,
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
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(
        apiResponse({
          status: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          error,
          message: "INTERNAL_SERVER_ERROR",
        })
      );
    }
  }
);

export default todoRouter;
