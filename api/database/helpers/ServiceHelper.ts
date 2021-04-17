import Service, {ServiceModel} from '../model/Service'

export default class ServiceHelper {
    public static async findBySlug(slug: string): Promise<Service | null> {
        return await ServiceModel.findOne({slug}).exec()
    }

    public static async findById(id: string): Promise<Service | null> {
        return await ServiceModel.findById(id).exec()
    }

    public static async find(page: number, category: string): Promise<Service[] | null> {
        return await ServiceModel
            .find({category})
            .sort({createdAt: -1})
            .skip((page - 1) * 9)
            .limit(9)
    }

    public static async getCount(category: string): Promise<number> {
        return await ServiceModel.countDocuments({category})
    }

    public static create(service: Service): Promise<Service> {
        return ServiceModel.create(service)
    }

    public static update(service: Service): Promise<Service | null> {
        return ServiceModel.findByIdAndUpdate(service._id, service).exec()
    }

    public static delete(id: string): Promise<Service | null> {
        return ServiceModel.findByIdAndDelete(id).exec()
    }
}
