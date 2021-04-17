import Article, { ArticleModel } from '../model/Article'

export default class ArticleHelper {
	public static async findBySlug(slug: string): Promise<Article | null > {
		return await ArticleModel.findOne({ slug }).exec()
	}

	public static async findById(id: string): Promise<Article | null> {
		return await ArticleModel.findById(id).exec()
	}

	public static async find(pageNumber: number): Promise<Article[] | null> {
		return await ArticleModel
			.find()
			.sort({ createdAt: -1 })
			.skip((pageNumber - 1) * 6)
			.limit(6)
	}

	public static async getCount(): Promise<number> {
		return await ArticleModel.countDocuments()
	}

	public static create(article: Article): Promise<Article> {
		return ArticleModel.create(article)
	}

	public static update(article: Article): Promise<Article | null> {
		return ArticleModel.findByIdAndUpdate(article._id, article).exec()
	}

	public static delete(id: string): Promise<Article | null> {
		return ArticleModel.findByIdAndDelete(id).exec()
	}
}
