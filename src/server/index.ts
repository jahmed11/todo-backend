import express, { Express, Response, Request } from "express";
import cors from "cors";
import path from "path";
import todoRoutes from "../routes/todoRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import { responseHandler } from "../middlewares/responseHandler";

const createServer = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.use(express.json());

  app.use(express.static(path.join(__dirname, "../../../frontend/dist")));

  // Handle all other routes and serve the index.html file


  app.use(responseHandler);

  app.use("/api/todos", todoRoutes);
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../frontend/dist", "index.html"));
  });

  app.use(errorHandler);

  return app;
};

export default createServer;
