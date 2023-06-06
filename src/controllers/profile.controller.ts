import ProfileService from "../services/profile.service";
import {Request, Response} from "express";
import Profile from "../models/profile.model";
import exp from "constants";

class ProfileController {
    profileService = new ProfileService()

    createProfileByUserIdController = async(req:Request, res:Response) => {
        const request : Profile = {
            relation : req.body.relation,
            name : req.body.name,
            birth : req.body.birth,
            gender : req.body.gender,
            graduation : req.body.graduation,
            graduation_status : req.body.graduation_status,
            country : req.body.country,
            city : req.body.city,
            occupation : req.body.occupation
        }

        const userId : number = req.body.userId

        try{
            await this.profileService.createProfileByUserIdService(request, userId)
            return res.send({
                "statusCode" : 200,
                "message" : "유저 생성 완료"
            })
        }catch (e) {
            return res.send({
                "statusCode" : 400,
                "message" : "파라미터를 확인해보세요"
            })
        }
    }
}

export default ProfileController
