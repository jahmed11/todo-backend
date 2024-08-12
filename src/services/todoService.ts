import { Todo } from "../models/todo";
import { v4 as uuidv4 } from "uuid";

/**
 * Service class responsible for managing Todo items.
 * 
 * This class provides methods to create, read, update, and delete Todo items.
 * It acts as a business logic layer, handling operations on the Todo list.
 */
export class TodoService {
   // Private array to store the list of todos
  private todos: Todo[] = [];

  getAll(): Todo[] {
    return this.todos;
  }

  private getById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  private findIndex(id: string): number {
    const index = this.todos.findIndex((todo) => todo.id === id);
    return index;
  }

  create(todo: Omit<Todo, "id">): Todo {
    const newTodo: Todo = {
      id: uuidv4(),
      ...todo,
    };
    this.todos.unshift(newTodo);
    return newTodo;
  }

  update(id: string, update: Partial<Todo>): Todo | undefined {
    const todo = this.getById(id);
    if (todo) {
      this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, ...update } : todo));

      return this.getById(id);
    }
    return undefined;
  }

  delete(id: string): boolean {
    const index = this.findIndex(id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }
}
