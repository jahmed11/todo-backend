import Joi from "joi";

// Define a Joi schema for creating a Todo
export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
});

// Define a Joi schema for updating a Todo
export const updateTodoSchema = Joi.object({
  title: Joi.string(),
  completed: Joi.boolean(),
}).or("title", "completed");
