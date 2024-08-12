import { Router } from "express";
import { TodoController } from "../controllers/todoController";
import { TodoService } from "../services/todoService";
import { validateRequest } from "../services/commonService";
import { createTodoSchema, updateTodoSchema } from "../validations/todoSchema";

const router = Router();
const todoService = new TodoService();
// Inject the TodoService instance into TodoController
const todoController = new TodoController(todoService);

router.get("/", todoController.getTodos);
router.post("/", validateRequest(createTodoSchema), todoController.createTodo);
router.put("/:id", validateRequest(updateTodoSchema), todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
