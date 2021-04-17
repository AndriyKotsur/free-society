import Joi from 'joi'

export default {
	search: Joi.object().keys({
		q: Joi.string().required(),
	}),
	visitor: Joi.object().keys({
		name: Joi.string().required().max(50).trim(),
		email: Joi.string().required().max(254).email(),
		message: Joi.string().required().max(500).trim(),
	}),
}
