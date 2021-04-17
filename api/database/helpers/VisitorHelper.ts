import Visitor, {VisitorModel} from '../model/Visitor'

export default class VisitorHelper {
    public static async create(visitor: Visitor): Promise<{ visitor: Visitor }> {
        const newVisitor = await VisitorModel.create(visitor)

        return {visitor: newVisitor}
    }
}
