import express, { Express } from "express";
import cors from "cors";
import todoRoutes from "../routes/todoRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import { responseHandler } from "../middlewares/responseHandler";

const createServer = (): Express => {
  const app = express();

  app.use(cors({
    origin: '*', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true, // This is important if you are dealing with cookies
  }));

  app.use(express.json());


  app.use(responseHandler);

  app.use("/api/todos", todoRoutes);

  app.use(errorHandler);

  return app;
};

export default createServer;
