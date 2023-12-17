
import { MongoDBTodoDataSource } from "../../data/data-sources/mongodb/mongodb-todo-data-source";
import { TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask } from "../../domain/models/todo";
import { TodoRepositoryImpl } from "../../domain/repositories/todo-repository-impl";
import { CreateTodo } from "../../domain/use-cases/todo/create-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";
import { GetAllTodo } from "../../domain/use-cases/todo/get-all-todo";
import { GetAllWithSubTasksTodo } from "../../domain/use-cases/todo/get-all-with-subtasks-todo";
import { GetOneTodo } from "../../domain/use-cases/todo/get-one-todo";
import { UpdateTodo } from "../../domain/use-cases/todo/update-todo";
import TodoRouter from "./todo-router";

async function initRouter(dataSourceTodo: MongoDBTodoDataSource<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask>) {
    const todoMiddleWare = TodoRouter(
        new GetAllTodo(new TodoRepositoryImpl(dataSourceTodo)),
        new CreateTodo(new TodoRepositoryImpl(dataSourceTodo)),
        new DeleteTodo(new TodoRepositoryImpl(dataSourceTodo)),
        new UpdateTodo(new TodoRepositoryImpl(dataSourceTodo)),
        new GetOneTodo(new TodoRepositoryImpl(dataSourceTodo)),
        new GetAllWithSubTasksTodo(new TodoRepositoryImpl(dataSourceTodo)),
    )
    return todoMiddleWare;
}

export { initRouter }