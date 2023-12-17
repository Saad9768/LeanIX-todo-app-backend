export interface DeleteTodoUseCase {
    execute(id: String): Promise<{ message: string }>;
}