import express from "express";
import healthRoutes from "./routes/health.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import notFound from "./middleware/not-found.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));
app.use("/health", healthRoutes);
app.use("/todos", todoRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
