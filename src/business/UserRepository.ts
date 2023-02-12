import { Following } from "../model/Following"
import { User } from "../model/User"

export interface UserRepository {
    signUp(user: User): Promise<void>
    findUser(prop: string, data: string): Promise<any>
    followUser(followingEntry: Following): Promise<void>
    checkFollowDupicity(followerId:string, followeeId:string):Promise<any>
}