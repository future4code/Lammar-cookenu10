import { UserRepository } from "../business/UserRepository"
import { CustomError } from "../error/CustomError"
import { User } from "../model/User"
import { BaseDB } from "./BaseDB"

export class UserData extends BaseDB implements UserRepository {
    private static tableName = "cookenu_users"

    async signUp(newUser: User): Promise<void> {
        try {
            await UserData.connection(UserData.tableName)
                .insert(newUser)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async findUser(prop: string, data: string): Promise<any> {
        try {
            const result = await UserData.connection(`${UserData.tableName}`)
                .select().where(prop, data)

            return result
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };
}