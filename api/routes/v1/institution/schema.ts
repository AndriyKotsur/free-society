import Joi from 'joi'
import { JoiObjectId } from '../../../helpers/validator'

export default {
	institutionId: Joi.object().keys({
		id: JoiObjectId().required(),
	}),
	institutionSlug: Joi.object().keys({
		slug: Joi.string().required(),
	}),
	create: Joi.object().keys({
		title: Joi.string().required().trim().max(250),
		// slug: Joi.string().required().trim(),
		content: Joi.string().required().trim(),
	}),
}
