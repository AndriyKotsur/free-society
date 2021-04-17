import Article, { ArticleModel } from '../model/Article'
import Service, { ServiceModel } from '../model/Service'

export default class ArticleHelper {
	public static async getArticles(): Promise<Article[] | null> {
		return await ArticleModel
			.find()
			.sort({ createdAt: -1 })
			.limit(5)
	}

	public static async getOurServices(): Promise<Service[] | null> {
		return await ServiceModel
			.find({ category: 'our' })
			.sort({ createdAt: -1 })
			.limit(5)
	}

	public static async getPublicServices(): Promise<Service[] | null> {
		return await ServiceModel
			.find({ category: 'public' })
			.sort({ createdAt: -1 })
			.limit(5)
	}

	public static async getSearchedArticles(q: string): Promise<Article[] | null> {
		const filter = {
			title: {
				$regex: `^${q}`,
				$options: 'i',
			},
		}

		return await ArticleModel.find(filter)
	}
}
