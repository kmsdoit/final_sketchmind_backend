import express from "express";
import UserController from "../controllers/users.controller";

const userRouter = express.Router();
const userController = new UserController

userRouter.post('/create',userController.createUserController)

export default userRouter
