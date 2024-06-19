import { SECRETKEY_TOKEN } from "../utils/env";
import jwt from "jsonwebtoken";

export interface GenerateToken {
  id: number;
  email: string;
  userRole: string;
}

export const generateToken = (user: GenerateToken) => {
  const payload = {
    id: user.id,
    email: user.email,
    userRole: user.userRole,
  };

  const token = jwt.sign(payload, SECRETKEY_TOKEN, {
    expiresIn: "24h",
  });

  return token;
};
