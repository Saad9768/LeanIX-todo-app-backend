import server from './server'
import { TodoRequestModel, TodoResponseModelSubTask, TodoResponseModel } from './domain/models/todo'
import { logInfo, logError } from './config/logging';
import { SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { getMongoTodoDS } from './data/data-sources/mongodb'
import { initRouter } from './presentation/routers'

const NAMESPACE = 'Main';

async function main() {
    const dataSourceTodo = await getMongoTodoDS<TodoRequestModel, TodoResponseModel, TodoResponseModelSubTask>();
    const todoMiddleWare = await initRouter(dataSourceTodo)
    server.use("/todo", todoMiddleWare)
    server.listen(SERVER_PORT, () => logInfo(NAMESPACE, `Running on http://${SERVER_HOSTNAME}:${SERVER_PORT}`))
}
main().catch(err => logError(NAMESPACE, `Error err :: `, err))
