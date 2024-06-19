import express, { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { getUserByEmail, createUser } from "../controllers/user.controller";
import { RESPONSE_CODE } from "../constants";
import { apiResponse } from "../utils";
import { validateEmail } from "../utils/validation";
import { generateToken } from "../helpers/jwt.helper";

const userRouter = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const checkEmail = validateEmail(email);
    if (!checkEmail) {
      return res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Invalid email format !",
        })
      );
    }
    if (!password || String(password).length < 6) {
      return res.status(RESPONSE_CODE.BAD_REQUEST).send(
        apiResponse({
          status: RESPONSE_CODE.BAD_REQUEST,
          message: "Invalid password format ! At least 6 characters",
        })
      );
    }
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
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
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
});

export default userRouter
