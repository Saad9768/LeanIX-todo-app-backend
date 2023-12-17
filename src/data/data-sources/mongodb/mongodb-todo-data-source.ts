import { Filter, MatchKeysAndValues, ObjectId, OptionalUnlessRequiredId } from 'mongodb'
import { TodoRequestModel, TodoResponseModel } from "../../../domain/models/todo";
import { TodoDataSource } from "../../interfaces/data-sources/todo-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/nosql-database-wrapper";

export class MongoDBTodoDataSource<Rq, Rs, RsS> implements TodoDataSource<Rq, Rs, RsS> {

    private db: NoSQLDatabaseWrapper<Rq, Rs, RsS>
    constructor(db: NoSQLDatabaseWrapper<Rq, Rs, RsS>) {
        this.db = db
    }
    async deleteMany(query: Filter<Rs & Rs>) {
        return this.db.deleteMany(query)
    }
    async updateOne(query: Partial<Rs>, data: MatchKeysAndValues<Rs>) {
        return this.db.updateOne(query, { "$set": data })
    }
    async getOne(query: Partial<Rs>) {
        return this.db.findOne(query)
    }

    async create(todo: OptionalUnlessRequiredId<Rs>) {
        return this.db.insertOne(todo)
    }

    async getAll(query: Partial<Rs>) {
        return this.db.find(query)
    }

    async getOneWithChildren(query: any) {
        return this.db.aggregate(query)
    }
}