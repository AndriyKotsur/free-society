import sendgridMail from '@sendgrid/mail'
import { sendgrid } from '../../config'

sendgridMail.setApiKey(sendgrid.secretKey)

interface Props {
	fromEmail: string
	toEmail: string
	subject: string
	content: string
}

export const sendMail = ({ fromEmail = 'free-society.com', toEmail = sendgrid.defaultEmail, subject, content }: Props): Promise<any> => {
	const message = {
		to: toEmail,
		from: fromEmail,
		subject,
		html: content,
	}

	return sendgridMail.send(message)
}
