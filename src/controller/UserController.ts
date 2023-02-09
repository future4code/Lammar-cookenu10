import { Request, Response } from 'express'
import { createUserDTO } from '../model/User'
import { UserBusiness } from '../business/UserBusiness'

export class UserController {
    constructor(private userBusiness: UserBusiness){}

    async signUp(req: Request, res:Response):Promise<void>{
        try {
            const { name, email, password } = req.body

            const newUser:createUserDTO = { name, email, password }

            const token = await this.userBusiness.signUp(newUser)

            res.status(201).send({ message: "User created.", token })

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    // async getUsers(req:Request, res:Response):Promise<void>{
    //     try {
    //         const result = await this.userBusiness.getUsers()
    //         res.status(200).send(result)
    //     } catch (error:any) {
    //         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    //     }
    // }
}