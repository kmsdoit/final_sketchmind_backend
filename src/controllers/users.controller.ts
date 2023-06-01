import { Request, Response } from "express";
import UserService from "../services/users.service";
import User from "../models/users.model";


class UserController {
    userService = new UserService()

    createUserController = async(req:Request, res:Response) => {
        const request : User = {
            email : req.body.email,
            name : req.body.name,
            provider : req.body.provider
        }

        console.log(request)

        const createUserData = await this.userService.createUser(request)

        return res.send({
            "statusCode" : 200,
            "message" : createUserData
        })
    }

    findByUserEmailController = async(req:Request, res: Response) => {
        const userEmail : string = req.query.email as string

        const userInfo = await this.userService.findByUserEmail(userEmail)

        if (userInfo !== null) {
            return res.send({
                "statusCode" : 200,
                "message" : userInfo
            })
        }else {
            return res.send({
                "statusCode" : 400,
                "message" : userInfo
            })
        }
    }
}

export default UserController
