import express from 'express'
import bcrypt from 'bcrypt'
import validator, { ValidationSource } from '../../../helpers/validator'
import { prepareToken } from '../../../services/jwt'
import Admin from '../../../database/model/Admin'
import AdminHelper from '../../../database/helpers/AdminHelper'
import { SuccessResponse, SuccessMsgResponse } from '../../../helpers/apiResponse'
import { BadRequestError } from '../../../helpers/apiError'
import schema from './schema'

const router = express.Router()

router.post('/signup', validator(schema.signup), async(req, res, next) => {
	try {
		const { body, headers } = req
		const admin = await AdminHelper.findByEmail(body.email)
		if(admin) throw new BadRequestError('User has been registered')

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(body.password, salt)

		const { admin: newAdmin } = await AdminHelper.create({
			name: body.name,
			email: body.email,
			password: hash,
		} as Admin)

		const userAgent = headers['user-agent'] as string
		const acceptLanguage = headers['accept-language'] as string
		const token = prepareToken(newAdmin._id, userAgent, acceptLanguage)

		new SuccessResponse('Successful signup', { token }).send(res)
	} catch (error) {
		next(error)
	}
})

router.post('/login', validator(schema.login), async(req, res, next) => {
	try {
		const { body, headers } = req
		const admin = await AdminHelper.findByEmail(body.email)
		if(!admin) throw new BadRequestError('User has not been found')
		if(!admin.password) throw new BadRequestError('Credentials has not been set')

		const isMatch = await bcrypt.compare(body.password, admin.password)
		if(!isMatch) throw new BadRequestError('Provided credentials are invalid')

		const userAgent = headers['user-agent'] as string
		const acceptLanguage = headers['accept-language'] as string
		const token = prepareToken(admin._id, userAgent, acceptLanguage)

		new SuccessResponse('Successful login', { token }).send(res)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', validator(schema.adminId, ValidationSource.PARAM), async(req, res, next) => {
	try {
		const { params } = req
		const admin = await AdminHelper.findById(params.id)

		new SuccessResponse('User has been successfully found', { admin }).send(res)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', validator(schema.adminId, ValidationSource.PARAM), validator(schema.signup), async (req, res, next) => {
	try {
		const { body, params } = req
		const admin = await AdminHelper.findById(params.id)
		if(!admin) throw new BadRequestError('User has not been found')

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(body.password, salt)

		await AdminHelper.update({
			...body,
			_id: admin._id,
			password: hash,
		} as Admin)

		new SuccessMsgResponse('User has been successfully updated').send(res)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', validator(schema.adminId, ValidationSource.PARAM), async (req, res, next) => {
	try {
		const { params } = req
		const admin = await AdminHelper.findById(params.id)
		if(!admin) throw new BadRequestError('User has not been found')

		await AdminHelper.delete(params.id)

		new SuccessMsgResponse('User has been successfully deleted').send(res)
	} catch (error) {
		next(error)
	}
})

export default router
