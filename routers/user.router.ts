import bcryptjs from "bcryptjs";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RESPONSE_CODE } from "../constants";
import { createUser, getUserByEmail } from "../controllers/user.controller";
import { generateToken } from "../helpers/jwt.helper";
import { apiResponse } from "../utils";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  [
    body("email", "Invalid does not Empty").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid does not Empty").not().isEmpty(),
    body("password", "password more than 6 degits").isLength({ min: 6 }),
  ],
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

      const { email, password } = req.body;

      const isExisted = await getUserByEmail(email);
      if (isExisted) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).send(
          apiResponse({
            status: RESPONSE_CODE.BAD_REQUEST,
            message: "Email already existed !!",
          })
        );
      }

      const salt = bcryptjs.genSaltSync();
      const hasPassword = bcryptjs.hashSync(password, salt);

      const newUser = {
        email,
        password: hasPassword,
        userRole: "user",
      };
      const user = await createUser(newUser);
      const userResponse = JSON.parse(JSON.stringify(user));
      delete userResponse.password;

      res.status(RESPONSE_CODE.CREATED).send(
        apiResponse({
          status: RESPONSE_CODE.CREATED,
          message: "Signup successfully !",
          data: userResponse,
        })
      );
    } catch (error) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Signup fail !",
          error,
        })
      );
    }
  }
);

userRouter.post(
  "/login",
  [
    body("email", "Invalid does not Empty").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "password more than 6 degits").isLength({ min: 6 }),
  ],
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

      const { email, password } = req.body;
      const user = await getUserByEmail(email);

      const isAuth = bcryptjs.compareSync(password, user?.password || "");
      if (!isAuth) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).send(
          apiResponse({
            status: RESPONSE_CODE.BAD_REQUEST,
            message: "Wrong credentials !",
          })
        );
      }

      const token = generateToken(user);
      const userResponse = JSON.parse(JSON.stringify(user));
      delete userResponse.password;
      return res.status(RESPONSE_CODE.OK).send(
        apiResponse({
          status: RESPONSE_CODE.OK,
          message: "Login successfully!",
          data: { user: userResponse, token },
        })
      );
    } catch (error) {
      return res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Wrong credentials !",
          error,
        })
      );
    }
  }
);

export default userRouter;
