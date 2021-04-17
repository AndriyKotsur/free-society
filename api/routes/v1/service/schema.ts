import Joi from 'joi'
import {JoiObjectId} from '../../../helpers/validator'

export default {
    serviceId: Joi.object().keys({
        id: JoiObjectId().required(),
    }),
    serviceSlug: Joi.object().keys({
        slug: Joi.string().length(8).required(),
    }),
    pagination: Joi.object().keys({
        page: Joi.number().required().integer().min(1),
        category: Joi.string().valid('our', 'public').required(),
    }),
    create: Joi.object().keys({
        title: Joi.string().required().trim().max(250),
        category: Joi.string().valid('our', 'public').required().trim().max(15),
        content: Joi.string().required().trim(),
    }),
}
