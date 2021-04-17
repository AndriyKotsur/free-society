import {model, Schema, Document} from 'mongoose'

export default interface Visitor extends Document {
    name: string
    email: string
    message: string
}

const schema = new Schema<Visitor>(
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
            trim: true,
            maxlength: 254,
        },
        message: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 500,
        },
    },
)

export const VisitorModel = model<Visitor>('Visitor', schema, 'visitors')
