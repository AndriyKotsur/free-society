import dotenv from 'dotenv'
dotenv.config()

export const environment = process.env.NODE_ENV

export const port = process.env.PORT || 8000

export const database = {
	mongoUri: process.env.MONGO_URI as string,
}

export const token = {
	expiresIn: process.env.TOKEN_EXPIRES_IN,
	tokenSecret: process.env.TOKEN_SECRET_KEY,
}

export const sendgrid = {
	defaultEmail: process.env.SENDGRID_MAIL as string,
	secretKey: process.env.SENDGRID_SECRET_KEY as string,
}
