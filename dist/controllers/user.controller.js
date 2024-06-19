"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserList = exports.createUser = void 0;
const { User } = require("../models");
const createUser = (payload) => {
    return User.create(payload);
};
exports.createUser = createUser;
const getUserList = () => {
    return User.findAll();
};
exports.getUserList = getUserList;
const getUserByEmail = (email) => {
    return User.findOne({ where: { email } });
};
exports.getUserByEmail = getUserByEmail;
