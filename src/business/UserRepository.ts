import { Following } from "../model/Following"
import { Recipe } from "../model/Recipe"
import { User } from "../model/User"

export interface UserRepository {
    signUp(user: User): Promise<void>
    findUser(prop: string, data: string): Promise<any>
    followUser(followingEntry: Following): Promise<void>
    isFollowing(followerId: string, followeeId: string): Promise<any>
    unfollowUser(unfollowDTO: string): Promise<void>
    getFeed(id: string): Promise<any>
}