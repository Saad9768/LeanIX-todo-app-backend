// domain/use-cases/todo/-get-all-todo.ts
import { TodoResponseModel } from "../../models/todo";
import { TodoRepository } from "../../interfaces/repositories/todo-repository";
import { GetAllWithSubTaskTodoUseCase } from "../../interfaces/use-cases/todo/get-all-with-subtasks-todo-use-case";

export class GetAllWithSubTasksTodo implements GetAllWithSubTaskTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: String): Promise<TodoResponseModel[]> {
        return this.todoRepository.getTodoWithSubtasks(id)
    }
}