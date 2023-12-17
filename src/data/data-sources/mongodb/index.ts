import { MongoClient, ObjectId } from 'mongodb'
import {
    MONGO_DB_URL,
    DB_NAME,
    COLLECTION_NAME,
} from '../../../config/config';
import { MongoDBTodoDataSource } from './mongodb-todo-data-source';
import { logInfo } from '../../../config/logging';
import { NoSQLDatabaseWrapper } from '../../interfaces/data-sources/nosql-database-wrapper';


const NAMESPACE = 'Connect Mongo';

async function getMongoTodoDS<Rq, Rs extends { _id: ObjectId }, RsS extends { _id: ObjectId }>() {
    const client: MongoClient = new MongoClient(MONGO_DB_URL)
    await client.connect()
    logInfo(NAMESPACE, `Mongo DB connected ... `);
    const db = client.db(DB_NAME);
    const todo = db.collection<Rs>(COLLECTION_NAME)

    const todoDatabase: NoSQLDatabaseWrapper<Rq, Rs, RsS> = {
        find: (query) => todo.find<Rs>(query).toArray(),
        findOne: (query) => todo.findOne<Rs>(query),
        insertOne: (val) => todo.insertOne(val),
        deleteMany: (query) => todo.deleteMany(query),
        updateOne: (query, data) => todo.updateOne(query, data),
        aggregate: (aggregationPipeline) => todo.aggregate<RsS>(aggregationPipeline).toArray()
    }
    return new MongoDBTodoDataSource<Rq, Rs, RsS>(todoDatabase);
}
export { getMongoTodoDS }