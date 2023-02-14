import { CustomError } from "../error/CustomError"
import { UserRepository } from "./UserRepository"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Following } from "../model/Following"
import { Recipe } from "../model/Recipe"
import { 
    CreateUserDTO, LoginInputDTO,
    User, UserOutputDTO
} from "../model/User"
import {
    EmailNotProvided, InvalidEmail, PasswordTooShort,
    NameNotProvided, PasswordNotProvided, UserNotFound,
    InvalidPassword, Unauthorized, IdNotProvided,
    UserAlreadyFollowing, NotFollowingUser, RoleNotProvided
} from "../error/UserError"

const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

export class UserBusiness {
    constructor(private userData: UserRepository) { }

    async signUp(input: CreateUserDTO): Promise<string> {
        try {
            const { name, role, email, password } = input

            if (!name) {
                throw new NameNotProvided
            }
            if (!role) {
                throw new RoleNotProvided
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

            const id: string = idGenerator.generateId()

            const newUser = new User(
                id,
                name,
                role,
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


    async login(loginInput: LoginInputDTO) {
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
                result.id,
                result.name,
                result.role,
                result.email,
                result.password
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


    async getUserProfile(token: string) {
        try {
            if (!token) {
                throw new Unauthorized
            }

            const { id } = authenticator.getTokenData(token)

            const { name, role, email } = await this.userData.findUser("id", id)

            const userProfile:UserOutputDTO = {
                id,
                name,
                role,
                email
            }

            return userProfile
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };


    async getAnotherUserProfile(token: string, id: string) {
        try {
            if (!token) {
                throw new Unauthorized
            }
            if (!id) {
                throw new IdNotProvided
            }

            const { name, role, email } = await this.userData.findUser("id", id)

            const userProfile:UserOutputDTO = {
                id,
                name,
                role,
                email
            }

            return userProfile
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };


    async followUser(token: string, userToFollowId: string) {
        try {
            if (!userToFollowId || userToFollowId.length === 0) {
                throw new IdNotProvided
            }

            const userId = authenticator.getTokenData(token).id
            if (!userId || !token) {
                throw new Unauthorized
            }

            const findFollowee = await this.userData.findUser("id", userToFollowId)
            if (!findFollowee) {
                throw new UserNotFound
            }

            const checkFollowDuplicity = await this.userData.isFollowing(userId, userToFollowId)
            if (checkFollowDuplicity[0].length >= 1) {
                throw new UserAlreadyFollowing
            }

            const id: string = idGenerator.generateId()

            const followingEntry = new Following(
                id,
                userId,
                userToFollowId
            )

            await this.userData.followUser(followingEntry)
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }


    async unfollowUser(token: string, userToUnfollowId: string) {
        try {
            if (!userToUnfollowId || userToUnfollowId.length === 0) {
                throw new IdNotProvided
            }

            const userId = authenticator.getTokenData(token).id
            if (!userId || !token) {
                throw new Unauthorized
            }

            const isFollowing = await this.userData.isFollowing(userId, userToUnfollowId)
            if (isFollowing[0].length < 1) {
                throw new NotFollowingUser
            }

            await this.userData.unfollowUser(isFollowing[0][0].id)
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }

    async getFeed(token: string): Promise<Recipe[]> {
        try {
            const { id } = authenticator.getTokenData(token)

            if (!token || !id) {
                throw new Unauthorized
            }

            const feed = await this.userData.getFeed(id)

            return feed
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }
}