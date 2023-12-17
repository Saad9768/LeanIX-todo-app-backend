//test/domain/use-cases/todo/get-all-todo.test.ts
import { ObjectId } from "mongodb";
import { TodoRepository } from "../../../../src/domain/interfaces/repositories/todo-repository";
import { TodoRequestModel, TodoResponseModel } from "../../../../src/domain/models/todo";
import { GetAllTodo } from '../../../../src/domain/use-cases/todo/get-all-todo';

describe("Get All Todos Use Case", () => {

    class MockTodoRepository implements TodoRepository {
        getTodoWithSubtasks(id: String): Promise<TodoResponseModel[]> {
            throw new Error("Method not implemented.");
        }
        deleteTodo(id: String): Promise<{ message: string }> {
            throw new Error("Method not implemented.");
        }
        updateTodo(id: String, data: Partial<TodoRequestModel>):
            Promise<{ modifiedCount: number, upsertedCount: number, matchedCount: number }> {
            throw new Error("Method not implemented.");
        }
        getTodo(id: String): Promise<TodoResponseModel | null> {
            throw new Error("Method not implemented.");
        }
        createTodo(todo: TodoRequestModel): Promise<{ _id: string, message: string }> {
            throw new Error("Method not implemented.");
        }
        getTodos(query: Partial<TodoResponseModel>): Promise<TodoResponseModel[]> {
            throw new Error("Method not implemented.");
        }
    }
    let mockTodoRepository: TodoRepository;
    beforeAll(() => {
        jest.mock('../../../../src/config/logging')
    })
    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoRepository = new MockTodoRepository()
    })

    test("should return data", async () => {
        const ExpectedResult: TodoResponseModel[] = [{
            "_id": new ObjectId("65783ce7d6a86fbdab5c5569"),
            "title": "P1 EDIT 2",
            "description": "P1 EDIT 2 4",
            "completed": false,
            "parentId": null,
            "userId": "1234-UUid"
        }];
        jest.spyOn(mockTodoRepository, "getTodos").mockImplementation(() => Promise.resolve(ExpectedResult))
        const getAllTodoUse = new GetAllTodo(mockTodoRepository)
        const result = await getAllTodoUse.execute({});
        expect(result).toStrictEqual(ExpectedResult)
    });

})