// domain/interfaces/repositories/todo-repository.ts
import { TodoRequestModel, TodoResponseModel } from "../../models/todo";

export interface TodoRepository {
    createTodo(todo: TodoResponseModel): Promise<{ _id: string, message: string }>;
    deleteTodo(id: String): Promise<{ message: string }>;
    updateTodo(id: String, data: Partial<TodoRequestModel>):
        Promise<{ modifiedCount: number, upsertedCount: number, matchedCount: number }>;
    getTodos(query: Partial<TodoResponseModel>): Promise<TodoResponseModel[]>;
    getTodo(id: String): Promise<TodoResponseModel | null>;
    getTodoWithSubtasks(id: String): Promise<TodoResponseModel[]>;
}