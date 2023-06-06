import express from "express";
import UserController from "../controllers/users.controller";
import ProfileController from "../controllers/profile.controller";

const profileRouter = express.Router();
const profileController = new ProfileController()

profileRouter.post('/create',profileController.createProfileByUserIdController)


export default profileRouter