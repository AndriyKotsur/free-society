import Joi, {StringSchema} from 'joi'
import {Request, Response, NextFunction} from 'express'
import {Types} from 'mongoose'

import logger from './logger'

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}

export const JoiObjectId = (): StringSchema =>
    Joi.string().custom((value: string, helpers) => {
        if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid')

        return value
    }, 'Object Id Validation')

export const JoiAuthBearer = (): StringSchema =>
    Joi.string().custom((value: string, helpers) => {
        if (!value.startsWith('Bearer ')) return helpers.error('any.invalid')
        if (!value.split(' ')[1]) return helpers.error('any.invalid')

        return value
    }, 'Authorization Header Validation')

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const {error} = schema.validate(req[source])
        if (!error) return next()

        const {details} = error
        const message = details.map(i => i.message.replace(/['"]+/g, '')).join(',')
        logger.error(message)

        next(message)
    } catch (error) {
        next(error)
    }
}
