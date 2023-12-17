import { InsertOneResult, ObjectId } from 'mongodb';
import { MongoDBTodoDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-todo-data-source'
import { NoSQLDatabaseWrapper } from '../../../../src/data/interfaces/data-sources/nosql-database-wrapper';
import { TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask } from '../../../../src/domain/models/todo';

describe("MongoDB DataSource", () => {

    let mockDatabase: NoSQLDatabaseWrapper<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask>
    
    beforeAll(async () => {
        jest.mock('../../../../src/config/logging')
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteMany: jest.fn(),
            findOne: jest.fn(),
            aggregate: jest.fn(),
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBTodoDataSource(mockDatabase);
        const expectedResult: TodoResponseModel[] = [{
            "_id": new ObjectId("65783ce7d6a86fbdab5c5569"),
            "title": "P1 EDIT 2",
            "description": "P1 EDIT 2 4",
            "completed": false,
            "parentId": null,
            "userId": "1234"
        }]
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve(expectedResult))
        const result = await ds.getAll({});
        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual(expectedResult)
    })


    test("create", async () => {
        const ds = new MongoDBTodoDataSource(mockDatabase);
        const expectedResult: InsertOneResult<TodoResponseModel> = {
            acknowledged: false,
            insertedId: new ObjectId()
        }
        const inputData = {
            "_id": new ObjectId(),
            "title": "P1",
            "description": "P1 description",
            "completed": false,
            "parentId": null,
            "userId": "1234"
        }
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve(expectedResult))
        await ds.create(inputData);
        expect(mockDatabase.insertOne).toHaveBeenCalledWith(inputData)
    })

    test("deleteOne", async () => {
        const ds = new MongoDBTodoDataSource(mockDatabase);
        const input = new Object()
        await ds.deleteMany(input);
        expect(mockDatabase.deleteMany).toHaveBeenCalledWith(input)
    })

    test("updateOne", async () => {
        const ds = new MongoDBTodoDataSource(mockDatabase);
        const inputId = { _id: new ObjectId() }
        const inputData = { completed: true }
        await ds.updateOne(inputId, inputData);
        expect(mockDatabase.updateOne).toHaveBeenCalledWith(inputId, { "$set": inputData })
    })

    test("getOne", async () => {
        const ds = new MongoDBTodoDataSource(mockDatabase);
        const inputId = "65783ce7d6a86fbdab5c5569"
        const expectedResult: TodoResponseModel = {
            "_id": new ObjectId(inputId),
            "title": "P1 EDIT 2",
            "description": "P1 EDIT 2 4",
            "completed": false,
            "parentId": null,
            "userId": "1234"
        }
        jest.spyOn(mockDatabase, "findOne").mockImplementation(() => Promise.resolve(expectedResult))
        const result = await ds.getOne({ _id: new ObjectId(inputId) });
        expect(result).toStrictEqual(expectedResult)
        expect(mockDatabase.findOne).toHaveBeenCalledWith({ _id: new ObjectId(inputId) })
    })

})