import {model, Schema, Document} from 'mongoose'

export default interface Institution extends Document {
    title: string
    slug: string
    content: string
}

const schema = new Schema<Institution>(
    {
        title: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 250,
        },
        slug: {
            type: Schema.Types.String,
            enum: ['communities', 'administrative-service-centers', 'ngos', 'public-councils'],
            required: true,
            trim: true,
        },
        content: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
    }, {timestamps: true},
)

export const InstitutionModel = model<Institution>('Institution', schema, 'institutions')
