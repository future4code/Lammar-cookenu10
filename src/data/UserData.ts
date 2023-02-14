import { UserRepository } from "../business/UserRepository"
import { CustomError } from "../error/CustomError"
import { Following } from "../model/Following"
import { Recipe } from "../model/Recipe"
import { User } from "../model/User"
import { BaseDB } from "./BaseDB"

export class UserData extends BaseDB implements UserRepository {
    private static userTableName = "cookenu_users"
    private static followingTableName = "cookenu_following"

    async signUp(newUser: User): Promise<void> {
        try {
            await UserData.connection(UserData.userTableName)
                .insert(newUser)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async findUser(prop: string, data: string): Promise<any> {
        try {
            const result = await UserData.connection(`${UserData.userTableName}`)
                .select().where(prop, data)

            return result[0]
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };


    async followUser(followingEntry: Following) {
        try {
            await UserData.connection(UserData.followingTableName)
                .insert(followingEntry)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async isFollowing(followerId: string, followeeId: string): Promise<any> {
        try {
            const result = await UserData.connection.raw(`
                SELECT * FROM ${UserData.followingTableName}
                WHERE user_id = "${followerId}"
                AND user_to_follow_id = "${followeeId}";
            `)
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async unfollowUser(unfollowId: string) {
        try {
            await UserData.connection(UserData.followingTableName)
                .delete()
                .where("id", unfollowId)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getFeed(id: string): Promise<any> {
        try {
            const feed = await UserData.connection.raw(`
                SELECT
                    R.id, R.title, R.description,
                    R.creation_date as createdAt,
                    R.author_id as userId,
                    U.name as userName
                FROM cookenu_recipes R JOIN cookenu_following F
                ON R.author_id = F.user_to_follow_id
                JOIN cookenu_users U
                ON F.user_to_follow_id = U.id
                WHERE F.user_id = "${id}"
                ORDER BY R.creation_date;
            `)

            return feed[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

}