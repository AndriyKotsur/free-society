import express from 'express'
import Joi from 'joi'

import { parseBearer } from '../services/jwt'
import AdminHelper from '../database/helpers/AdminHelper'
import validator, { ValidationSource } from './validator'
import { AuthFailureError } from './apiError'
import { JoiAuthBearer } from './validator'
const router = express.Router()

const schema = {
	auth: Joi.object().keys({
		authorization: JoiAuthBearer().required(),
	}).unknown(true),
}

export default router.use(validator(schema.auth, ValidationSource.HEADER), async (req, _, next) => {
	try {
		const { headers } = req
		const authorization = headers['authorization'] as string
		const userAgent = headers['user-agent'] as string
		const acceptLanguage = headers['accept-language'] as string

		const payload = parseBearer(authorization, userAgent, acceptLanguage)

		const admin = await AdminHelper.findById(payload.data)
		if (!admin) throw new AuthFailureError('Admin not registered')

		next()
	} catch (error) {
		next(error)
	}
})
