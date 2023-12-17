import { TodoRequestModel } from "../../../models/todo";

export interface GetAllWithSubTaskTodoUseCase {
    execute(id: String): Promise<TodoRequestModel[]>;
}