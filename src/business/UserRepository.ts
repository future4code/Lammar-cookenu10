import { User } from "../model/User"

export interface UserRepository {
    signUp(user:User):Promise<void>
    // getUsers():Promise<User[]>
}