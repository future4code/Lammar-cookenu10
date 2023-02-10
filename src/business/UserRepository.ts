import { User } from "../model/User"

export interface UserRepository {
    signUp(user: User): Promise<void>
    findUser(prop: string, data: string): Promise<any>
}