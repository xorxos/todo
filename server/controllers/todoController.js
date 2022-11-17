import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

import ToDo from "../models/ToDo.js";

const createTodo = async (req, res) => {
  const { todo } = req.body;

  if (!todo) throw new BadRequestError("Please provide all values");

  const newToDo = await ToDo.create(req.body);
  res.status(StatusCodes.CREATED).json({ newToDo });
};

const getAllTodos = async (req, res) => {
  const todoItems = await ToDo.find();
  const totalItems = await ToDo.countDocuments();
  res.status(StatusCodes.OK).json({ todoItems, totalItems });
};

const completeTodo = async (req, res) => {
  const { id: todoId } = req.params;

  // check if todo is found
  const todo = await ToDo.findOne({ _id: todoId });
  if (!todo) throw new NotFoundError(`No todo found with id: ${todoId}`);

  // change todo to completed
  const completedTodo = await ToDo.findOneAndUpdate(
    { _id: todoId },
    { status: "completed" },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ completedTodo });
};

const clearCompletedTodos = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "clear completed todos" });
};

export { createTodo, getAllTodos, clearCompletedTodos, completeTodo };
