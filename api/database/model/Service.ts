import {model, Schema, Document} from 'mongoose'

export default interface Service extends Document {
    title: string
    slug: string
    category: string
    content: string
}

const schema = new Schema<Service>(
    {
        title: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxLength: 250,
        },
        slug: {
            type: Schema.Types.String,
            required: true,
        },
        category: {
            type: Schema.Types.String,
            enum: ['our', 'public'],
            required: true,
        },
        content: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
    }, {timestamps: true},
)

export const ServiceModel = model<Service>('Service', schema, 'services')
