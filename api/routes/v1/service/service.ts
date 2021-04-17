import express from 'express'
import validator, { ValidationSource } from '../../../helpers/validator'
import auth from '../../../helpers/auth'
import Service from '../../../database/model/Service'
import ServiceHelper from '../../../database/helpers/ServiceHelper'
import { SuccessResponse, SuccessMsgResponse } from '../../../helpers/apiResponse'
import { BadRequestError } from '../../../helpers/apiError'
import schema from './schema'

const router = express.Router()

router.get('/:slug', validator(schema.serviceSlug, ValidationSource.PARAM), async (req, res, next) => {
	try {
		const { params } = req
		const service = await ServiceHelper.findBySlug(params.slug as string)
		if (!service) throw new BadRequestError('Service has not been found')

		new SuccessResponse('Service has been successfully found', { services: [service] }).send(res)
	} catch (error) {
		next(error)
	}
})

router.get('/', validator(schema.pagination, ValidationSource.QUERY), async (req, res, next) => {
	try {
		const { page, category } = req.query
		const services = await ServiceHelper.find(parseInt(page as string), category as string)
		if(!services) throw new BadRequestError('Services has not been found')

		const count = await ServiceHelper.getCount(category as string)

		new SuccessResponse('Services has been successfully found', { services, count }).send(res)
	} catch (error) {
		next(error)
	}
})

router.post('/', auth, validator(schema.create), async (req, res, next) => {
	try {
		const { body } = req
		await ServiceHelper.create({
			...body,
			slug: Math.random().toString(36).slice(-8),
		} as Service)

		new SuccessMsgResponse('Service has been created').send(res)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', auth, validator(schema.serviceId, ValidationSource.PARAM), validator(schema.create), async (req, res, next) => {
	try {
		const { body, params } = req
		const service = await ServiceHelper.findById(params.id)
		if(!service) throw new BadRequestError('Service has not been found')

		await ServiceHelper.update({
			...body,
			_id: service._id,
		} as Service)

		new SuccessMsgResponse('Service has been successfully updated').send(res)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', auth, validator(schema.serviceId, ValidationSource.PARAM), async(req, res, next) => {
	try {
		const { params } = req
		const service = await ServiceHelper.findById(params.id)
		if(!service) throw new BadRequestError('Service has not been found')

		await ServiceHelper.delete(params.id)

		new SuccessMsgResponse('Service has been successfully deleted').send(res)
	} catch (error) {
		next(error)
	}
})

export default router
