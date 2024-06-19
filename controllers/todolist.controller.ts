import { TodoParams } from "./todolist.type";

const { Todo } = require("../models");

export const createTodo = (payload: TodoParams) => {
  return Todo.create(payload);
};

export const getTodoList = () => {
  return Todo.findAll();
};

export const getTodoById = (id: number | string) => {
  return Todo.findOne({
    where: { id },
  });
};

export const deleteTodoById = (id: number | string) => {
  return Todo.destroy({
    where: { id },
  });
};

export const updateTodoById = (id: number | string, payload: TodoParams) => {
  return Todo.update(payload, {
    where: { id },
  });
};
