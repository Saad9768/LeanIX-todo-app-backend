import { TodoResponseModel } from "../../../models/todo";

export interface CreateTodoUseCase {
    execute(todo: TodoResponseModel): Promise<{
        _id: string;
        message: string;
    }>;
}