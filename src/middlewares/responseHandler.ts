import { Request, Response, NextFunction } from "express";

// Extend the Response interface to include success and error methods
declare global {
  namespace Express {
    interface Response {
      success(data: any, message?: string, statusCode?: number): void;
      error(message: string, statusCode?: number): void;
    }
  }
}

// Implement the response handler middleware
export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any, message: string = "Success", statusCode: number = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (message: string, statusCode: number = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

  next();
};
