// domain/repositories/todo-repository.ts
import { TodoDataSource } from "../../data/interfaces/data-sources/todo-data-source";
import { TodoRequestModel, TodoResponseModel,TodoResponseModelSubTask } from "../models/todo";
import { TodoRepository } from "../interfaces/repositories/todo-repository";
import { ObjectId } from "mongodb";

export class TodoRepositoryImpl implements TodoRepository {
    todoDataSource: TodoDataSource<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask>
    constructor(todoDataSource: TodoDataSource<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask>) {
        this.todoDataSource = todoDataSource
    }
    async deleteTodo(id: String) {
        const query = {
            "$or": [{
                "parentId": new ObjectId(id.toString())
            }, {
                "_id": new ObjectId(id.toString())
            }]
        }
        const { deletedCount } = await this.todoDataSource.deleteMany(query)
        return deletedCount ? { message: "Deleted" } : { message: "Not Deleted" }
    }
    async updateTodo(id: String, data: Partial<TodoRequestModel>) {
        const inputId = new ObjectId(id.toString())
        const { modifiedCount, upsertedCount, matchedCount } =
            await this.todoDataSource.updateOne({ _id: inputId }, data);
        return { modifiedCount, upsertedCount, matchedCount }
    }
    async getTodo(id: String) {
        return this.todoDataSource.getOne({ _id: new ObjectId(id.toString()) });
    }

    async createTodo(todo: TodoResponseModel) {
        const { parentId } = todo
        if (parentId) {
            todo.parentId = new ObjectId(parentId.toString())
        }
        const { insertedId } = await this.todoDataSource.create(todo)
        return { _id: insertedId.toString(), message: "Created" };
    }
    async getTodos(query: Partial<TodoResponseModel>) {
        if (query.parentId) {
            query.parentId = query.parentId && query.parentId === 'null' ? null : new ObjectId(query.parentId.toString())
        }
        return this.todoDataSource.getAll(query)
    }
    async getTodoWithSubtasks(id: String) {
        const query = [
            {
                '$match': {
                    '_id': new ObjectId(id.toString())
                }
            }, {
                '$lookup': {
                    'from': 'todo',
                    'localField': '_id',
                    'foreignField': 'parentId',
                    'as': 'childrens'
                }
            }
        ]
        return this.todoDataSource.getOneWithChildren(query);
    }
}