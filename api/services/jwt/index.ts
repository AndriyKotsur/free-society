import jwt from 'jsonwebtoken'
import {token} from '../../config'

interface ParseToken {
    data: string
    iat: number
    exp: number
}

const prepareSecret = (userAgent: string, acceptLanguage: string) => {
    return token.tokenSecret + userAgent + acceptLanguage
}

export const parseBearer = (bearer: string, userAgent: string, acceptLanguage: string): ParseToken => {
    return <ParseToken>jwt.verify(bearer.slice(7), prepareSecret(userAgent, acceptLanguage))
}

export const prepareToken = (data: string | Buffer, userAgent: string, acceptLanguage: string): string => {
    return jwt.sign({data}, prepareSecret(userAgent, acceptLanguage), {expiresIn: token.expiresIn})
}
