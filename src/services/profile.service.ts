import profileModel from "../models/profile.model";
import ProfileModel from "../models/profile.model";
import ProfileRepository from "../repository/profile.repository";


class ProfileService  {
    profileRepository = new ProfileRepository()
    createProfileByUserIdService = async(profile : ProfileModel, userId : number) => {
        await this.profileRepository.createProfileByUserId(profile, userId)
    }
}

export default ProfileService

