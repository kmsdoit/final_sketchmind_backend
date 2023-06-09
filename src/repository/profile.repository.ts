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

    getProfileByProfileId = async (profileId : number) => {
        const profileData = await prisma.profile.findUnique({
            where : {
                id : profileId
            }
        })

        return profileData
    }

    getAllProfileRepo = async() => {
        const profileData = await prisma.profile.findMany()

        return profileData
    }
}

export default ProfileRepository
