// domain/use-cases/todo/-get-all-todo.ts
import { TodoResponseModel } from "../../models/todo";
import { TodoRepository } from "../../interfaces/repositories/todo-repository";
import { GetAllTodoUseCase } from "../../interfaces/use-cases/todo/get-all-todo-use-case";

export class GetAllTodo implements GetAllTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(query: Partial<TodoResponseModel>): Promise<TodoResponseModel[]> {
        return this.todoRepository.getTodos(query)
    }
}