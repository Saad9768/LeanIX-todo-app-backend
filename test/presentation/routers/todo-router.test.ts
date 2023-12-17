import request from "supertest";
import { CreateTodoUseCase } from "../../../src/domain/interfaces/use-cases/todo/create-todo-use-case";
import { GetAllTodoUseCase } from "../../../src/domain/interfaces/use-cases/todo/get-all-todo-use-case";
import { TodoRequestModel, TodoResponseModel } from "../../../src/domain/models/todo";
import TodoRouter from '../../../src/presentation/routers/todo-router'
import server from '../../../src/server'
import { DeleteTodoUseCase } from "../../../src/domain/interfaces/use-cases/todo/delete-todo-use-case";
import { UpdateTodoUseCase } from "../../../src/domain/interfaces/use-cases/todo/update-todo-use-case";
import { GetOneTodoUseCase } from "../../../src/domain/interfaces/use-cases/todo/get-one-todo-use-case";
import { GetAllWithSubTaskTodoUseCase } from "../../../src/domain/interfaces/use-cases/todo/get-all-with-subtasks-todo-use-case";
import { ObjectId } from "mongodb";

class MockGetAllTodoUseCase implements GetAllTodoUseCase {
    execute(): Promise<TodoResponseModel[]> {
        throw new Error("Method not implemented.");
    }
}

class MockCreateTodoUseCase implements CreateTodoUseCase {
    execute(todo: TodoRequestModel): Promise<{ _id: string; message: string; }> {
        throw new Error("Method not implemented.");
    }
}
class MockDeleteTodoUseCase implements DeleteTodoUseCase {
    execute(id: String): Promise<{ message: string }> {
        throw new Error("Method not implemented.");
    }
}
class MockUpdateTodoUseCase implements UpdateTodoUseCase {
    execute(id: String, data: Partial<TodoRequestModel>):
    Promise<{ modifiedCount: number, upsertedCount: number, matchedCount: number }> {
        throw new Error("Method not implemented.");
    }
}
class MockGetOneTodoUseCase implements GetOneTodoUseCase {
    execute(id: String): Promise<TodoResponseModel | null> {
        throw new Error("Method not implemented.");
    }
}
class MockGetAllWithSubTasksTodoUseCase implements GetAllWithSubTaskTodoUseCase {
    execute(id: String): Promise<TodoRequestModel[]> {
        throw new Error("Method not implemented.");
    }
}

describe("Todo Router", () => {
    let mockCreateTodoUseCase: CreateTodoUseCase;
    let mockGetAllTodoUseCase: GetAllTodoUseCase;
    let mockDeleteTodoUseCase: DeleteTodoUseCase;
    let mockUpdateTodoUseCase: UpdateTodoUseCase;
    let mockGetOneTodoUseCase: GetOneTodoUseCase;
    let mockGetAllWithSubTasksTodoUseCase: GetAllWithSubTaskTodoUseCase;

    beforeAll(() => {
        jest.mock('../../../src/config/logging')
        mockGetAllTodoUseCase = new MockGetAllTodoUseCase()
        mockCreateTodoUseCase = new MockCreateTodoUseCase()
        server.use("/todo", TodoRouter(
            mockGetAllTodoUseCase,
            mockCreateTodoUseCase,
            mockDeleteTodoUseCase,
            mockUpdateTodoUseCase,
            mockGetOneTodoUseCase,
            mockGetAllWithSubTasksTodoUseCase,
        ))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /todo", () => {

        test("should return 200 with data", async () => {
            const inputId = "65783ce7d6a86fbdab5c5569"
            const expectedData: TodoResponseModel[] = [{
                "_id": new ObjectId(inputId),
                "title": "P1 EDIT 2",
                "description": "P1 EDIT 2 4",
                "completed": false,
                "parentId": null,
                "userId": "1234-UUid"
            }];
            jest.spyOn(mockGetAllTodoUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData))

            const response = await request(server).get("/todo")
            for (const r of response.body) {
                expect(r._id).toStrictEqual(inputId)
                r._id = new ObjectId(inputId)
            }
            expect(response.status).toBe(200)
            expect(mockGetAllTodoUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(expectedData)
        });

        test("GET /todo returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllTodoUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/todo")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("POST /todo", () => {

        test("POST /todo", async () => {
            const InputData: TodoRequestModel = {
                "title": "P1",
                "description": "P1 description",
                "completed": false,
                "parentId": null,
                "userId": "1234"
            }
            const expectedData = {
                _id: "65783ce7d6a86fbdab5c5569",
                message: "string",
            }
            jest.spyOn(mockCreateTodoUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData))
            const response = await request(server).post("/todo").send(InputData)
            expect(response.status).toBe(201)
        });

        test("POST /todo returns 500 on use case error", async () => {
            const InputData: TodoRequestModel = {
                "title": "P1",
                "description": "P1 description",
                "completed": false,
                "parentId": null,
                "userId": "1234"
            }
            jest.spyOn(mockCreateTodoUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/todo").send(InputData)
            expect(response.status).toBe(500)
        });
    })
})