import ProfileModel from "../models/profile.model";
import ProfileRepository from "../repository/profile.repository";


class ProfileService  {
    profileRepository = new ProfileRepository()
    createProfileByUserIdService = async(profile : ProfileModel, userId : number) => {
        await this.profileRepository.createProfileByUserId(profile, userId)
    }

    getProfileByProfileIdService = async(profileId : number) => {
        const profileData = await this.profileRepository.getProfileByProfileId(profileId)

        return profileData
    }

    getAllProfileService = async() => {
        const profileData = await this.profileRepository.getAllProfileRepo()

        return profileData
    }
}

export default ProfileService

