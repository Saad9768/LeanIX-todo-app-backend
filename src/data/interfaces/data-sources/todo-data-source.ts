// data/data-sources/todo-data-source.ts
import { DeleteResult, Filter, InsertOneResult, MatchKeysAndValues, OptionalUnlessRequiredId, UpdateResult } from "mongodb";
import { TodoRequestModel, TodoResponseModel } from "../../../domain/models/todo";
export interface TodoDataSource<Rq, Rs, RsS> {
    create(todo: OptionalUnlessRequiredId<Rs>): Promise<InsertOneResult<Rs>>;
    getAll(query: Partial<Rs>): Promise<Rs[]>;
    deleteMany(query: Filter<Rs & Rs>): Promise<DeleteResult>;
    updateOne(query: Partial<Rs>, data: MatchKeysAndValues<Rs>): Promise<UpdateResult>;
    getOne(query: Partial<Rs>): Promise<Rs | null>;
    getOneWithChildren(query: any): Promise<RsS[]>;
}