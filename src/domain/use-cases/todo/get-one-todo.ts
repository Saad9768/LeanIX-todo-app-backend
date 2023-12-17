// domain/use-cases/todo/-get-all-todo.ts
import { TodoResponseModel } from "../../models/todo";
import { TodoRepository } from "../../interfaces/repositories/todo-repository";
import { GetOneTodoUseCase } from "../../interfaces/use-cases/todo/get-one-todo-use-case";

export class GetOneTodo implements GetOneTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: String): Promise<TodoResponseModel | null> {
        return this.todoRepository.getTodo(id)
    }
}