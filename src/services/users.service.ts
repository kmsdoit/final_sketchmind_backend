import UserRepository from "../repository/users.repository";
import User from "../models/users.model";

class UserService {
    userRepository = new UserRepository()

    createUser = async(user: User) => {
        const createUserData = await this.userRepository.createUser(user)

        return {
            createUserData
        }
    }

    findByUserEmail = async(email : string) => {
        const userInfo = await this.userRepository.userInfoByEmail(email)

        return userInfo
    }
}

export default UserService
