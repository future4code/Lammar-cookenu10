import { Request, Response } from 'express'
import { CreateUserDTO, LoginInputDTO } from '../model/User'
import { UserBusiness } from '../business/UserBusiness'

export class UserController {
    constructor(private userBusiness: UserBusiness) { }

    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body

            const newUser: CreateUserDTO = { name, email, password }

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

            const userData = await this.userBusiness.getUserProfile(token)

            res.status(200).send({ id: userData.id, name: userData.name, email: userData.email })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };


    async getAnotherUserProfile(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const { id } = req.params

            const userData = await this.userBusiness.getAnotherUserProfile(token, id)

            res.status(200).send({ id: userData.id, name: userData.name, email: userData.email })
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
}