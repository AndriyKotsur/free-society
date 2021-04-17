import Joi from 'joi'
import {JoiObjectId} from '../../../helpers/validator'

export default {
    adminId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    signup: Joi.object().keys({
        name: Joi.string().required().max(50).trim(),
        email: Joi.string().required().max(254).email(),
        password: Joi.string().required().min(6),
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required().max(254),
        password: Joi.string().required().min(6),
    }),
}
