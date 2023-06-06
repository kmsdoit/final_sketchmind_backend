import ProfileModel from "../models/profile.model";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
class ProfileRepository {

    createProfileByUserId = async (profile : ProfileModel, userId : number) => {
        const createProfile = await prisma.profile.create({
            data :{
                ...profile,
                userId : userId
            }
        })

        return null
    }
}

export default ProfileRepository
