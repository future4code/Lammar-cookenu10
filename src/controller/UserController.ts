import { Request, Response } from 'express'
import { CreateUserDTO, LoginInputDTO, UserOutputDTO } from '../model/User'
import { UserBusiness } from '../business/UserBusiness'

export class UserController {
    constructor(private userBusiness: UserBusiness) { }

    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const { name, role, email, password } = req.body

            const newUser: CreateUserDTO = { name, role, email, password }

            const token = await this.userBusiness.signUp(newUser)

            res.status(201).send({ message: "User created.", token })

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const loginInput: LoginInputDTO = {
                email,
                password,
            }

            const token = await this.userBusiness.login(loginInput)

            res.status(200).send({ token })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };


    async getUserProfile(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            const userData: UserOutputDTO = await this.userBusiness.getUserProfile(token)

            res.status(200).send(userData)
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };


    async getAnotherUserProfile(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const { id } = req.params

            const userData: UserOutputDTO = await this.userBusiness.getAnotherUserProfile(token, id)

            res.status(200).send(userData)
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };


    async followUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            let { userToFollowId } = req.body

            await this.userBusiness.followUser(token, userToFollowId)

            res.status(201).send({ message: "Followed successfully." })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }


    async unfollowUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            let { userToUnfollowId } = req.body

            await this.userBusiness.unfollowUser(token, userToUnfollowId)

            res.status(200).send({ message: "Unfollowed successfully." })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }


    async getFeed(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            const recipes = await this.userBusiness.getFeed(token)

            res.status(200).send({ recipes })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }


    async deleteAccount(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            const { userId } = req.body

            await this.userBusiness.deleteAccount(userId, token)

            res.status(200).send({ message: "Account deleted." })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}