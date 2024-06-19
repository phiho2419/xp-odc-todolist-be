import jwt from "jsonwebtoken";
import { SECRETKEY_TOKEN } from "../utils/env";
import { getTimeStampSecond } from "../utils/date";
import { RESPONSE_CODE } from "../constants";
import { apiResponse } from "../utils";
import { NextFunction, Request, Response } from "express";
interface GenerateTokenJwtPayload extends jwt.JwtPayload {}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("token");
    const decode = <GenerateTokenJwtPayload>(
      jwt.verify(token || "", SECRETKEY_TOKEN)
    );
    if (decode.exp && decode.exp < getTimeStampSecond()) {
      return res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Token is expired !",
        })
      );
    }
    if (!decode.exp) {
      apiResponse({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: "Invalid token",
      })
    }

    const { email, userRole, id } = decode;

    req.body = { ...req.body, email, userRole, userId: id };

    next();
  } catch (error) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send(
      apiResponse({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: "Invalid token",
      })
    );
  }
};
