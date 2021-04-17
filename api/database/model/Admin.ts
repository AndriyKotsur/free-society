import { model, Schema, Document } from 'mongoose'

export default interface Admin extends Document {
  _id: string
  name: string
  email: string
  password: string
}

const schema = new Schema <Admin> (
	{
		name: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		email: {
			type: Schema.Types.String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 254,
		},
		password: {
			type: Schema.Types.String,
			required: true,
		},
	},
)

export const AdminModel = model<Admin>('Admin', schema, 'admins')
