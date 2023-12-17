//test/domain/repositories/todo-repository.test.ts
import { Filter, ObjectId, DeleteResult, UpdateResult, InsertOneResult } from "mongodb";
import { TodoDataSource } from "../../../src/data/interfaces/data-sources/todo-data-source";
import { TodoRepository } from "../../../src/domain/interfaces/repositories/todo-repository";
import { TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask } from "../../../src/domain/models/todo";
import { TodoRepositoryImpl } from "../../../src/domain/repositories/todo-repository-impl";
import { logInfo } from '../../../src/config/logging'

class MockTodoDataSource implements TodoDataSource<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask> {
    getOneWithChildren(query: any): Promise<TodoResponseModelSubTask[]> {
        throw new Error("Method not implemented.");
    }
    getOne(query: Partial<TodoResponseModel>): Promise<TodoResponseModel | null> {
        throw new Error("Method not implemented.");
    }
    create(todo: TodoRequestModel): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(query: Partial<TodoResponseModel>): Promise<TodoResponseModel[]> {
        throw new Error("Method not implemented.");
    }
    deleteMany(query: Filter<{ _id: ObjectId; } & TodoRequestModel>): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
    updateOne(query: Partial<TodoResponseModel>, data: Partial<TodoRequestModel>): Promise<UpdateResult> {
        throw new Error("Method not implemented.");
    }
}


describe("Todo Repository", () => {
    let mockTodoDataSource: TodoDataSource<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask>;
    let todoRepository: TodoRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoDataSource = new MockTodoDataSource()
        todoRepository = new TodoRepositoryImpl(mockTodoDataSource)
    })

    describe("getAllTodo", () => {
        test("should return data", async () => {
            const expectedData: TodoResponseModel[] = [{
                "_id": new ObjectId("65783ce7d6a86fbdab5c5569"),
                "title": "P1 EDIT 2",
                "description": "P1 EDIT 2 4",
                "completed": false,
                "parentId": null,
                "userId": "1234-UUid"
            }];
            jest.spyOn(mockTodoDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await todoRepository.getTodos({});
            expect(result).toBe(expectedData)
        });
    })

    describe("createTodo", () => {
        test("should make create ds call", async () => {
            const expectedResult: InsertOneResult<TodoResponseModel> = {
                acknowledged: false,
                insertedId: new ObjectId()
            }
            jest.spyOn(mockTodoDataSource, "create").mockImplementation(() => Promise.resolve(expectedResult))
            const inputId = new ObjectId()
            await todoRepository.createTodo({
                "_id": inputId,
                "title": "P1",
                "description": "P1 description",
                "completed": false,
                "parentId": null,
                "userId": "1234"
            });
            expect(mockTodoDataSource.create).toHaveBeenCalledWith({
                "_id": inputId,
                "title": "P1",
                "description": "P1 description",
                "completed": false,
                "parentId": null,
                "userId": "1234"
            })
        });
    })


    describe("deleteTodo", () => {
        test("should make deleteOne ds call", async () => {
            const expectedResult: DeleteResult = {
                deletedCount: 1,
                acknowledged: false
            }
            const inputId = "65783ce7d6a86fbdab5c5569"
            const calledParameter = {
                "$or": [{
                    "parentId": new ObjectId(inputId.toString())
                }, {
                    "_id": new ObjectId(inputId.toString())
                }]
            }
            jest.spyOn(mockTodoDataSource, "deleteMany").mockImplementation(() => Promise.resolve(expectedResult))
            await todoRepository.deleteTodo(inputId);
            expect(mockTodoDataSource.deleteMany).toHaveBeenCalledWith(calledParameter)
        });
    })

    describe("updateTodo", () => {
        test("should make updateOne ds call", async () => {
            const expectedData: UpdateResult = {
                acknowledged: false,
                matchedCount: 0,
                modifiedCount: 0,
                upsertedCount: 0,
                upsertedId: new ObjectId()
            };
            const inputData = {
                completed: true
            }
            jest.spyOn(mockTodoDataSource, "updateOne").mockImplementation(() => Promise.resolve(expectedData))
            const inputId = "65783ce7d6a86fbdab5c5569"
            await todoRepository.updateTodo(inputId, inputData);
            expect(mockTodoDataSource.updateOne).toHaveBeenCalledWith({ _id: new ObjectId(inputId) }, inputData)
        });
    })

    describe("getTodo", () => {
        test("should make getOne ds call", async () => {
            const inputId = "6579f887e4d2a1d6f2023ae0"
            const expectedData: TodoResponseModel = {
                "_id": new ObjectId("65783ce7d6a86fbdab5c5569"),
                "title": "P1 EDIT 2",
                "description": "P1 EDIT 2 4",
                "completed": false,
                "parentId": null,
                "userId": "1234"
            }
            jest.spyOn(mockTodoDataSource, "getOne").mockImplementation(() => Promise.resolve(expectedData))
            const result = await todoRepository.getTodo(inputId);
            expect(mockTodoDataSource.getOne).toHaveBeenCalledWith({ _id: new ObjectId(inputId) })
            expect(result).toStrictEqual(expectedData)
        });
    })
})