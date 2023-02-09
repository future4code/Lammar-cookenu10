import { createUserDTO, User } from "../model/User"
import { CustomError } from "../error/CustomError"
import { UserRepository } from "./UserRepository"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import {
    EmailNotProvided, InvalidEmail, PasswordTooShort,
    NameNotProvided, PasswordNotProvided
} from "../error/UserError"

const authenticator = new Authenticator()

export class UserBusiness {
    constructor(private userData: UserRepository) { }

    async signUp(input: createUserDTO): Promise<string> {
        try {
            const { name, email, password } = input

            if (!name) {
                throw new NameNotProvided
            }
            if (!email) {
                throw new EmailNotProvided
            }
            if (!password) {
                throw new PasswordNotProvided
            }
            if (password.length < 6) {
                throw new PasswordTooShort
            }
            if (!email.includes('@')) {
                throw new InvalidEmail
            }

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generateId()

            const newUser = new User(
                id,
                name,
                email,
                password
            )

            await this.userData.signUp(newUser)

            const token = authenticator.generateToken({ id })

            return token
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    // async getUsers(): Promise<User[]> {
    //     try {
    //         return await this.userData.getUsers()
    //     } catch (error: any) {
    //         throw new CustomError(error.statusCode, error.message)
    //     }
    // }
}