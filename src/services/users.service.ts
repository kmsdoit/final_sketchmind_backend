import { PrismaClient } from "@prisma/client";
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
}

export default UserService