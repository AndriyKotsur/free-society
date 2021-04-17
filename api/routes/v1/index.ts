import express from 'express'

import index from './index/index'
import admin from './admin/admin'
import article from './article/article'
import service from './service/service'
import institution from './institution/institution'

const router = express.Router()

router.use('/', index)
router.use('/admin', admin)
router.use('/article', article)
router.use('/service', service)
router.use('/institution', institution)

export default router
