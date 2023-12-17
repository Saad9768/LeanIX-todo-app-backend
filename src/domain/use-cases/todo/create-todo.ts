import { TodoResponseModel } from "../../models/todo";
import { TodoRepository } from "../../interfaces/repositories/todo-repository";
import { CreateTodoUseCase } from "../../interfaces/use-cases/todo/create-todo-use-case";


export class CreateTodo implements CreateTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(todo: TodoResponseModel) {
        return this.todoRepository.createTodo(todo)
    }
}