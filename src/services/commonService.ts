import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";


// Define the type for the validation schema
type ValidationSchema = ObjectSchema<any>;

/**
 * Middleware to validate request data against a Joi schema.
 * @param schema - Joi schema to validate request data.
 * @returns Middleware function.
 */
export const validateRequest =
  (schema: ValidationSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!schema) {
      return next();
    }

    try {
      // Define validation options
      const validationOptions = {
        errors: {
          wrap: { label: "" },
        },
        abortEarly: false,
      };

      // Determine data source based on request method
      let data;
      if (req.method === "GET") {
        data = { ...req.query, ...req.params };
      } else {
        data = req.body.data;
      }

      // Validate data using the provided schema
      const result = await schema.validateAsync(data, validationOptions);

      // Assign validated result to request object
      if (req.method === "GET") {
        req.query = result;
      } else {
        req.body.data = result;
      }

      next();
    } catch (error) {
      next(error);
    }
  };

