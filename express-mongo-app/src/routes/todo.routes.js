import express from "express";
import * as todoController from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/").get(todoController.listTodos).post(todoController.createTodo);
router
  .route("/:id")
  .all(todoController.validateTodoId)
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

export default router;
