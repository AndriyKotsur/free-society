import express, { Request, Response, NextFunction } from 'express'
import morganLogger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { port } from './config'
import routerV1 from './routes/v1'
import { ApiError, InternalError, NotFoundError } from './helpers/apiError'
import logger from './helpers/logger'
import { environment } from './config'
import './services/mongoose'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morganLogger('dev'))

app.use('/v1', routerV1)

app.use((req, res, next) =>
	next(new NotFoundError()))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof ApiError) {
		ApiError.handle(err, res)
	} else {
		if(environment === 'development') {
			logger.error(err)

			return res.status(500).send(err.message)
		}
		logger.error(err)
		ApiError.handle(new InternalError(err.message), res)
	}
})

app.listen(port, () =>
	console.log(`⚡️ [  server  ]: running at port: ${port}`))

export default app
