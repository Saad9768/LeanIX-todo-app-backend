//test/domain/use-cases/todo/create-todo.test.ts
import { ObjectId } from "mongodb";
import { TodoRepository } from "../../../../src/domain/interfaces/repositories/todo-repository";
import { TodoRequestModel, TodoResponseModel } from "../../../../src/domain/models/todo";
import { CreateTodo } from '../../../../src/domain/use-cases/todo/create-todo'

describe("Create Todo Use Case", () => {
    class MockTodoRepository implements TodoRepository {
        createTodo(todo: TodoRequestModel): Promise<{ _id: string; message: string; }> {
            throw new Error("Method not implemented.");
        }
        deleteTodo(id: String): Promise<{ message: string; }> {
            throw new Error("Method not implemented.");
        }
        updateTodo(id: String, data: Partial<TodoRequestModel>): Promise<{ modifiedCount: number; upsertedCount: number; matchedCount: number; }> {
            throw new Error("Method not implemented.");
        }
        getTodos(query: Partial<TodoResponseModel>): Promise<TodoResponseModel[]> {
            throw new Error("Method not implemented.");
        }
        getTodo(id: String): Promise<TodoResponseModel | null> {
            throw new Error("Method not implemented.");
        }
        getTodoWithSubtasks(id: String): Promise<TodoResponseModel[]> {
            throw new Error("Method not implemented.");
        }
    }

    beforeAll(() => {
        jest.mock('../../../../src/config/logging')
    })

    let mockTodoRepository: TodoRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoRepository = new MockTodoRepository()
    })

    test("should return true", async () => {
        const InputData = {
            '_id': new ObjectId(),
            "title": "P1",
            "description": "P1 description",
            "completed": false,
            "parentId": null,
            "userId": "1234"
        }
        const ExpectedResult = { _id: "6578c14e90dba9c647a25207", message: "Created" }
        jest.spyOn(mockTodoRepository, "createTodo").mockImplementation(() => Promise.resolve(ExpectedResult))
        const createTodoUseCase = new CreateTodo(mockTodoRepository)
        const result = await createTodoUseCase.execute(InputData);
        expect(mockTodoRepository.createTodo).toBeCalledTimes(1)
    });

})