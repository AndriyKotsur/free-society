import {model, Schema, Document} from 'mongoose'

export default interface Article extends Document {
    title: string
    slug: string
    content: string
    tags: string[]
    words: number
}

const schema = new Schema<Article>(
    {
        title: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 250,
        },
        slug: {
            type: Schema.Types.String,
            required: true,
        },
        content: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        tags: [{
            type: Schema.Types.String,
            required: true,
            trim: true,
        }],
        words: Schema.Types.Number,
    }, {timestamps: true},
)

export const ArticleModel = model<Article>('Article', schema, 'articles')
