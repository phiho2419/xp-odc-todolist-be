import { UserParams } from "./user.type";
const { User } = require("../models");

export const createUser = (payload: UserParams) => {
  return User.create(payload);
};

export const getUserList = () => {
  return User.findAll();
};

export const getUserByEmail = (email: string) => {
  return User.findOne({ where: { email } });
};
