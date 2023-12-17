import { TodoResponseModel } from "../../../models/todo"

export interface GetOneTodoUseCase {
    execute(id: String): Promise<TodoResponseModel | null>;
}