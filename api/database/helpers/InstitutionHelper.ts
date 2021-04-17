import Institution, { InstitutionModel } from '../model/Institution'

export default class InstitutionHelper {
	public static async findBySlug(slug: string): Promise<Institution | null > {
		return await InstitutionModel.findOne({ slug }).exec()
	}

	public static async findById(id: string): Promise<Institution | null> {
		return await InstitutionModel.findById(id).exec()
	}

	public static async find(): Promise<Institution[] | null> {
		return await InstitutionModel.find()
	}

	public static create(institution: Institution): Promise<Institution> {
		return InstitutionModel.create(institution)
	}

	public static update(institution: Institution): Promise<Institution | null> {
		return InstitutionModel.findByIdAndUpdate(institution._id, institution).exec()
	}

	public static async delete(id: string): Promise<Institution | null> {
		return InstitutionModel.findByIdAndDelete(id).exec()
	}
}
