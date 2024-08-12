import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todoService";
import { ValidationError } from "../utils/errors/ValidationError";
import { NotFoundError } from "../utils/errors/NotFoundError";

/**
 * Controller for handling Todo-related requests.
 *
 * This class interacts with the `TodoService` to perform operations on Todo items
 * and handles HTTP requests for Todo resources.
 */
export class TodoController {
  constructor(private todoService: TodoService) {}

  getTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = this.todoService.getAll();
      res.success(todos);
    } catch (err) {
      next(err);
    }
  };

  createTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const newTodo = this.todoService.create(data);
      res.success(newTodo, "new todo item created", 201);
    } catch (err) {
      next(err);
    }
  };

  updateTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const updatedTodo = this.todoService.update(id, data);
      if (updatedTodo) {
        res.success(updatedTodo);
      } else {
        throw new NotFoundError("Todo not found");
      }
    } catch (err) {
      next(err);
    }
  };

  deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const success = this.todoService.delete(id);
      if (success) {
        res.success(null, "todo deleted successfully", 204);
      } else {
        throw new NotFoundError("Todo not found");
      }
    } catch (err) {
      next(err);
    }
  };
}
