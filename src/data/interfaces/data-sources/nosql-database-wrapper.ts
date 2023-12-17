//data/interfaces/data-source/database.ts
import { Filter, InsertOneResult, MatchKeysAndValues, ObjectId, OptionalUnlessRequiredId, UpdateFilter, UpdateResult, WithId } from 'mongodb'
import { TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask } from '../../../domain/models/todo';
import { DeleteResult } from 'mongodb'
export interface NoSQLDatabaseWrapper<Rq, Rs, RsS> {
    find(query: Filter<Rs>): Promise<Rs[]>;
    findOne(query: Partial<Rs>): Promise<Rs | null>;
    insertOne(todo: OptionalUnlessRequiredId<Rs>): Promise<InsertOneResult<Rs>>
    deleteMany(query: Filter<Rs & Rs>): Promise<DeleteResult>;
    updateOne(query: Filter<Rs>, data: UpdateFilter<Rs>):
        Promise<UpdateResult>;
    aggregate(aggregationPipeline: any): Promise<RsS[]>
}