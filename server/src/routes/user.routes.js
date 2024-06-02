import express from "express";
import { loginController,signupController } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.post('/login', loginController);


userRouter.post('/signup', signupController);

export default userRouter