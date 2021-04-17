import express from 'express'
import validator, {ValidationSource} from '../../../helpers/validator'
import auth from '../../../helpers/auth'
import Institution from '../../../database/model/Institution'
import InstitutionHelper from '../../../database/helpers/InstitutionHelper'
import {SuccessResponse, SuccessMsgResponse} from '../../../helpers/apiResponse'
import {BadRequestError} from '../../../helpers/apiError'
import schema from './schema'

const router = express.Router()

router.get('/:slug', validator(schema.institutionSlug, ValidationSource.PARAM), async (req, res, next) => {
    try {
        const {params} = req
        const institution = await InstitutionHelper.findBySlug(params.slug as string)
        if (!institution) throw new BadRequestError('Institution has not been found')

        new SuccessResponse('Institution has been successfully found', {institutions: [institution]}).send(res)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (_, res, next) => {
    try {
        const institutions = await InstitutionHelper.find()
        if (!institutions) throw new BadRequestError('Institutions has not been found')

        new SuccessResponse('Institutions has been successfully found', {institutions}).send(res)
    } catch (error) {
        next(error)
    }
})

router.post('/', auth, validator(schema.create), async (req, res, next) => {
    try {
        const {body} = req
        await InstitutionHelper.create(body as Institution)

        new SuccessMsgResponse('Institution has been successfully created').send(res)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', auth, validator(schema.institutionId, ValidationSource.PARAM), validator(schema.create), async (req, res, next) => {
    try {
        const {body, params} = req
        const institution = await InstitutionHelper.findById(params.id)
        if (!institution) throw new BadRequestError('Institutions has not been found')

        await InstitutionHelper.update({
            ...body,
            _id: institution._id,
        } as Institution)

        new SuccessMsgResponse('Institution has been successfully updated').send(res)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', auth, validator(schema.institutionId, ValidationSource.PARAM), async (req, res, next) => {
    try {
        const {params} = req
        const institution = await InstitutionHelper.findById(params.id)
        if (!institution) throw new BadRequestError('Institutions has not been found')

        await InstitutionHelper.delete(params.id)

        new SuccessMsgResponse('Institution has been successfully deleted').send(res)
    } catch (error) {
        next(error)
    }
})

export default router
