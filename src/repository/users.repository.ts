import { PrismaClient } from "@prisma/client";
import User from "../models/users.model";

const prisma = new PrismaClient()

class UserRepository {

    createUser = async(user : User) => {
        const createUserData = await prisma.users.create({
            data : {
                name : user.name,
                email : user.email
            },
        })

        console.log(createUserData)
    }

}

export default UserRepository