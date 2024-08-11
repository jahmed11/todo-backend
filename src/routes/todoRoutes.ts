import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { TodoService } from '../services/todoService';


const router = Router();
const todoService = new TodoService();
const todoController = new TodoController(todoService);

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
