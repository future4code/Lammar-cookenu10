import * as jwt from "jsonwebtoken"
import { Unauthorized } from "../error/UserError"
import { AuthenticationData } from "../model/User"

export class Authenticator {
    public generateToken = ({ id, role }: AuthenticationData): string => {
        const token = jwt.sign(
            { id, role },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        )
        return token
    }

    getTokenData = (token: string): AuthenticationData => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData

            return payload
        } catch (error: any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    }
}