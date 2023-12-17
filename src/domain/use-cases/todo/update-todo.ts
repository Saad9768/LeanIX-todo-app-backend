import { TodoRepository } from "../../interfaces/repositories/todo-repository";
import { UpdateTodoUseCase } from "../../interfaces/use-cases/todo/update-todo-use-case";
import { TodoRequestModel } from "../../models/todo";


export class UpdateTodo implements UpdateTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: String, data: Partial<TodoRequestModel>) {
        return this.todoRepository.updateTodo(id, data)
    }
}