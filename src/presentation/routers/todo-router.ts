import express from 'express'
import { Request, Response } from 'express'
import { CreateTodoUseCase } from '../../domain/interfaces/use-cases/todo/create-todo-use-case'
import { GetAllTodoUseCase } from '../../domain/interfaces/use-cases/todo/get-all-todo-use-case'
import { DeleteTodoUseCase } from '../../domain/interfaces/use-cases/todo/delete-todo-use-case'
import { UpdateTodoUseCase } from '../../domain/interfaces/use-cases/todo/update-todo-use-case'
import { GetOneTodoUseCase } from '../../domain/interfaces/use-cases/todo/get-one-todo-use-case'
import { GetAllWithSubTaskTodoUseCase } from '../../domain/interfaces/use-cases/todo/get-all-with-subtasks-todo-use-case'


export default function TodoRouter(
    getAllTodoUseCase: GetAllTodoUseCase,
    createTodoUseCase: CreateTodoUseCase,
    deleteTodoUseCase: DeleteTodoUseCase,
    updateTodoUseCase: UpdateTodoUseCase,
    getOneTodoUseCase: GetOneTodoUseCase,
    getAllWithSubTaskTodoUseCase: GetAllWithSubTaskTodoUseCase,
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const query = req.query
            const todos = await getAllTodoUseCase.execute(query)
            res.send(todos)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const result = await createTodoUseCase.execute(req.body)
            res.statusCode = 201
            res.json(result)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error saving data" })
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const result = await deleteTodoUseCase.execute(req.params.id)
            res.json(result)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error deleting data" })
        }
    })

    router.patch('/:id', async (req: Request, res: Response) => {
        try {
            const result = await updateTodoUseCase.execute(req.params.id, req.body)
            res.json(result)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error updating data" })
        }
    })
    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const todo = await getOneTodoUseCase.execute(req.params.id)
            res.send(todo)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.get('/:id/subtasks', async (req: Request, res: Response) => {
        try {
            const todo = await getAllWithSubTaskTodoUseCase.execute(req.params.id)
            res.send(todo)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    return router
}