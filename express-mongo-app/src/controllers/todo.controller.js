import mongoose from "mongoose";
import Todo from "../models/todo.model.js";

async function listTodos(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ data: todos });
  } catch (error) {
    next(error);
  }
}

async function createTodo(req, res, next) {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      ...(typeof req.body.completed === "boolean" && { completed: req.body.completed }),
    });
    res.status(201).json({ data: todo });
  } catch (error) {
    next(error);
  }
}

async function getTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ data: todo });
  } catch (error) {
    next(error);
  }
}

async function updateTodo(req, res, next) {
  try {
    const updates = {};
    if (typeof req.body.title === "string") updates.title = req.body.title;
    if (typeof req.body.completed === "boolean") updates.completed = req.body.completed;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ data: todo });
  } catch (error) {
    next(error);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted", data: todo });
  } catch (error) {
    next(error);
  }
}

function validateTodoId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid todo id" });
  }
  next();
}

export { listTodos, createTodo, getTodo, updateTodo, deleteTodo, validateTodoId };
