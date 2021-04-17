import express from 'express'
import validator, {ValidationSource} from '../../../helpers/validator'
import auth from '../../../helpers/auth'
import Article from '../../../database/model/Article'
import ArticleHelper from '../../../database/helpers/ArticleHelper'
import {SuccessResponse, SuccessMsgResponse} from '../../../helpers/apiResponse'
import {BadRequestError} from '../../../helpers/apiError'
import schema from './schema'

const router = express.Router()

router.get('/:slug', validator(schema.articleSlug, ValidationSource.PARAM), async (req, res, next) => {
    try {
        const {params} = req
        const article = await ArticleHelper.findBySlug(params.slug as string)
        if (!article) throw new BadRequestError('Article has not been found')

        new SuccessResponse('Article has been successfully found', {articles: [article]}).send(res)
    } catch (error) {
        next(error)
    }
})

router.get('/', validator(schema.pagination, ValidationSource.QUERY), async (req, res, next) => {
    try {
        const {query} = req
        const articles = await ArticleHelper.find(parseInt(query.page as string))
        if (!articles) throw new BadRequestError('Articles has not been found')

        const count = await ArticleHelper.getCount()

        new SuccessResponse('Articles has been successfully found', {articles, count}).send(res)
    } catch (error) {
        next(error)
    }
})

router.post('/', auth, validator(schema.create), async (req, res, next) => {
    try {
        const {body} = req
        await ArticleHelper.create({
            ...body,
            slug: Math.random().toString(36).slice(-8),
        } as Article)

        new SuccessMsgResponse('Article has been successfully created').send(res)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', auth, validator(schema.articleId, ValidationSource.PARAM), validator(schema.create), async (req, res, next) => {
    try {
        const {body, params} = req
        const article = await ArticleHelper.findById(params.id)
        if (!article) throw new BadRequestError('Article has not been found')

        await ArticleHelper.update({
            ...body,
            _id: article._id,
        } as Article)

        new SuccessMsgResponse('Article has been successfully updated').send(res)

    } catch (error) {
        next(error)
    }
})

router.delete('/:id', auth, validator(schema.articleId, ValidationSource.PARAM), async (req, res, next) => {
    try {
        const {params} = req
        const article = await ArticleHelper.findById(params.id)
        if (!article) throw new BadRequestError('Article has not been found')

        await ArticleHelper.delete(params.id)

        new SuccessMsgResponse('Article has been successfully deleted').send(res)
    } catch (error) {
        next(error)
    }
})

export default router
