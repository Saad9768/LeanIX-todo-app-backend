import { TodoRequestModel } from "../../../models/todo";

export interface UpdateTodoUseCase {
    execute(id: String, data: Partial<TodoRequestModel>):
    Promise<{ modifiedCount: number, upsertedCount: number, matchedCount: number }>;
}