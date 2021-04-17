import Admin, { AdminModel } from '../model/Admin'

export default class AdminHelper {
	public static async findById(id: string): Promise<Admin | null> {
		return await AdminModel.findById(id).exec()
	}

	public static async findByEmail(email: string): Promise<Admin | null> {
		return await AdminModel.findOne({ email: email }).exec()
	}

	public static async create(admin: Admin): Promise<{admin: Admin}> {
		const newAdmin = await AdminModel.create(admin)

		return { admin: newAdmin }
	}

	public static async update(admin: Admin): Promise<{admin: Admin | null}> {
		const updatedAdmin = await AdminModel.findByIdAndUpdate(admin._id, admin).exec()

		return { admin: updatedAdmin }
	}

	public static delete(id: string): Promise<Admin | null> {
		return AdminModel.findByIdAndDelete(id).exec()
	}
}
