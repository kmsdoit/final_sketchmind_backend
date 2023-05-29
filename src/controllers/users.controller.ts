import { Request, Response } from "express";
import UserService from "../services/users.service";
import User from "../models/users.model";


class UserController {
    userService = new UserService()

    createUserController = async(req:Request, res:Response) => {
        const data = req.body
        console.log("body:", data)
        const request : User = {
            email : req.body.email,
            name : req.body.name
        }

        console.log(request)

        const createUserData = await this.userService.createUser(request)

        return res.send({
            "statusCode" : 200,
            "message" : createUserData
        })
    }
}

export default UserController