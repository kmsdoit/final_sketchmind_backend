import express, { Request, Response } from "express";
import UserService from "../services/users.service";
import User from "../models/users.model";
import {userInfo} from "os";


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
                "message" : "조회되는 계정이 없습니다."
            })
        }
    }

    findAllUsersController = async(req:Request, res: Response) => {
        const users = await this.userService.findAllUsers()

        if(users !== null) {
            return res.send({
                "statusCode" : 200,
                "message" : users
            })
        }else {
            return res.send({
                "statusCode" : 401,
                "message" : "권한이 없습니다"
            })
        }
    }

    updateUserByEmailController = async(req:Request, res:Response) => {
        const request : User = {
            email : req.body.email,
            name : req.body.name,
            provider : req.body.provider
        }
        try {
            await this.userService.updateUserByEmail(request)
            return res.send({
                "statusCode" : 200,
                "message" : request
            })
        }catch (e) {
            return res.send({
                "statusCode" : 200,
                "message" : e
            })
        }
    }
}

export default UserController
