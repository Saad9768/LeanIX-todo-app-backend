import {  TodoResponseModel } from "../../../models/todo";

export interface GetAllTodoUseCase {
    execute(query: Partial<TodoResponseModel>): Promise<TodoResponseModel[]>;
}