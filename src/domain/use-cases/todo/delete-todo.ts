import { TodoRepository } from "../../interfaces/repositories/todo-repository";
import { DeleteTodoUseCase } from "../../interfaces/use-cases/todo/delete-todo-use-case";


export class DeleteTodo implements DeleteTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: String) {
        return this.todoRepository.deleteTodo(id)
    }
}