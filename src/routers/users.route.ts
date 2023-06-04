import express from "express";
import UserController from "../controllers/users.controller";

const userRouter = express.Router();
const userController = new UserController

userRouter.post('/create',userController.createUserController)
userRouter.get('/get',userController.findByUserEmailController)
userRouter.get("/all", userController.findAllUsersController)
userRouter.post('/update', userController.updateUserByEmailController)

export default userRouter
