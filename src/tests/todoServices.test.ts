import { TodoService } from "../services/todoService";
import { Todo } from "../models/todo";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "1234-5678-9012-3456"), // Mock UUID for consistent test results
}));

describe("TodoService", () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService();
  });

  describe("getAll", () => {
    it("should return an empty array initially", () => {
      expect(todoService.getAll()).toEqual([]);
    });

    it("should return all todos", () => {
      const todo1: Todo = { id: "1", title: "Test Todo 1", completed: false };
      const todo2: Todo = { id: "2", title: "Test Todo 2", completed: true };
      todoService.create(todo1);
      todoService.create(todo2);
      const allTodos = todoService.getAll();
      expect(allTodos).toEqual([todo2, todo1]);
    });
  });

  describe("create", () => {
    it("should create a new todo", () => {
      const todoData: Omit<Todo, "id"> = { title: "New Todo", completed: false };
      const createdTodo = todoService.create(todoData);

      expect(createdTodo).toEqual({
        id: "1234-5678-9012-3456", // Mocked ID
        ...todoData,
      });
      expect(todoService.getAll()).toContainEqual(createdTodo);
    });

    it("should create a todo with default id and properties", () => {
      const todoData: Omit<Todo, "id"> = { title: "Another Todo", completed: true };
      const createdTodo = todoService.create(todoData);

      expect(createdTodo.id).toBe("1234-5678-9012-3456"); // Mocked ID
      expect(createdTodo.title).toBe(todoData.title);
      expect(createdTodo.completed).toBe(todoData.completed);
    });
  });

  describe("update", () => {
    it("should update an existing todo", () => {
      const initialTodo: Omit<Todo, "id"> = { title: "Todo to Update", completed: false };
      const createdTodo = todoService.create(initialTodo);

      const updatedData: Partial<Todo> = { title: "Updated Title", completed: true };

      const updatedTodo = todoService.update(createdTodo.id, updatedData);

      expect(updatedTodo).toEqual({
        id: createdTodo.id,
        title: updatedData.title,
        completed: updatedData.completed,
      });
      expect(todoService.getAll().find((todo) => todo.id === createdTodo.id)).toEqual(updatedTodo);
    });

    it("should return undefined if todo does not exist", () => {
      const updatedTodo = todoService.update("non-existing-id", { title: "New Title" });
      expect(updatedTodo).toBeUndefined();
    });
  });

  describe("delete", () => {
    it("should delete an existing todo", () => {
      const todoData: Omit<Todo, "id"> = { title: "Todo to Delete", completed: false };
      const createdTodo = todoService.create(todoData);

      const success = todoService.delete(createdTodo.id);

      expect(success).toBe(true);
      expect(todoService.getAll()).not.toContainEqual(createdTodo);
    });

    it("should return false if todo does not exist", () => {
      const success = todoService.delete("non-existing-id");
      expect(success).toBe(false);
    });
  });
});
