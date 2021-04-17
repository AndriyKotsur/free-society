import express from 'express'
import IndexHelper from '../../../database/helpers/IndexHelper'
import VisitorHelper from '../../../database/helpers/VisitorHelper'
import Visitor from '../../../database/model/Visitor'
import {SuccessMsgResponse, SuccessResponse} from '../../../helpers/apiResponse'
import {BadRequestError} from '../../../helpers/apiError'
import {sendMail} from '../../../services/sendgrid'
import validator, {ValidationSource} from '../../../helpers/validator'
import schema from './schema'

const router = express.Router()

router.get('/', async (_, res, next) => {
    try {
        const articles = await IndexHelper.getArticles()
        const ourServices = await IndexHelper.getOurServices()
        const publicServices = await IndexHelper.getPublicServices()

        if (!articles && !ourServices && !publicServices)
            throw new BadRequestError('No data')

        new SuccessResponse('Data has been successfully provided', {
            articles,
            ourServices,
            publicServices,
        }).send(res)
    } catch (error) {
        next(error)
    }
})

router.get('/search', validator(schema.search, ValidationSource.QUERY), async (req, res, next) => {
    try {
        const {q} = req.query
        const articles = await IndexHelper.getSearchedArticles(q as string)

        if (!articles)
            throw new BadRequestError('No data')

        new SuccessResponse('Data has been successfully provided', {articles}).send(res)
    } catch (error) {
        next(error)
    }
})

router.post('/visitor', validator(schema.visitor), async (req, res, next) => {
    try {
        const {body} = req

        const newVisitor = await VisitorHelper.create(body as Visitor)

        if (newVisitor) {
            const content =
                `<table>
					<tbody>
						<tr>Visitor: ${body.name}</tr>
						</br>
						<tr>Email: ${body.email}</tr>
						</br>
						<tr>Comment: ${body.message}</tr>
					</tbody>
				</table>`
            const response = await sendMail({
                fromEmail: '',
                toEmail: '',
                subject: '',
                content,
            })
            if (response[0].statusCode !== 202) throw new BadRequestError('Something went wrong with email service')

            new SuccessMsgResponse('Email has been successfully sent').send(res)
        }

        throw new BadRequestError('Something is wrong with provided data')
    } catch (error) {
        next(error)
    }
})

export default router
