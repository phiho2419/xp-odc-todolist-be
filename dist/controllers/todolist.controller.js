"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoById = exports.deleteTodoById = exports.getTodoById = exports.getTodoList = exports.createTodo = void 0;
const { Todo } = require("../models");
const createTodo = (payload) => {
    return Todo.create(payload);
};
exports.createTodo = createTodo;
const getTodoList = () => {
    return Todo.findAll();
};
exports.getTodoList = getTodoList;
const getTodoById = (id) => {
    return Todo.findOne({
        where: { id },
    });
};
exports.getTodoById = getTodoById;
const deleteTodoById = (id) => {
    return Todo.destroy({
        where: { id },
    });
};
exports.deleteTodoById = deleteTodoById;
const updateTodoById = (id, payload) => {
    return Todo.update(payload, {
        where: { id },
    });
};
exports.updateTodoById = updateTodoById;
