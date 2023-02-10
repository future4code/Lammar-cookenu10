import { createUserDTO, LoginInputDTO, User } from "../model/User"
import { CustomError } from "../error/CustomError"
import { UserRepository } from "./UserRepository"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import {
    EmailNotProvided, InvalidEmail, PasswordTooShort,
    NameNotProvided, PasswordNotProvided, UserNotFound,
    InvalidPassword
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


    public login = async (loginInput: LoginInputDTO) => {
        try {
            const { email, password } = loginInput

            if (!email) {
                throw new EmailNotProvided()
            }
            if (!email.includes("@")) {
                throw new InvalidEmail()
            }
            if (!password) {
                throw new PasswordNotProvided()
            }

            const result = await this.userData.findUser("email", email)

            if (result.length === 0) {
                throw new UserNotFound()
            }

            const userFound = new User(
                result[0].id,
                result[0].name,
                result[0].email,
                result[0].password
            )

            if (userFound.getPassword() !== password) {
                throw new InvalidPassword()
            }

            const token = authenticator.generateToken({ id: userFound.getId() })

            return token
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };
}