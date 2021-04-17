import Joi from 'joi'
import { JoiObjectId } from '../../../helpers/validator'

export default {
	articleId: Joi.object().keys({
		id: JoiObjectId().required(),
	}),
	articleSlug: Joi.object().keys({
		slug: Joi.string().required(),
	}),
	pagination: Joi.object().keys({
		page: Joi.number().required().integer().min(1),
	}),
	create: Joi.object().keys({
		title: Joi.string().required().trim().max(250),
		content: Joi.string().required().trim(),
		tags: Joi.array().items(Joi.string().max(50)).required(),
		words: Joi.number(),
	}),
}
