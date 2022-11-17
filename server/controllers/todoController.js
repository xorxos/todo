import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";

import ToDo from "../models/ToDo.js";

const createTodo = async (req, res) => {
  const { todo } = req.body;

  if (!todo) throw new BadRequestError("Please provide all values");

  const newToDo = await ToDo.create(req.body);
  res.status(StatusCodes.CREATED).json({ newToDo });
};

const getAllTodos = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get todos" });
};

const clearCompletedTodos = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "clear completed todos" });
};

const completeTodo = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "complete todo" });
};

export { createTodo, getAllTodos, clearCompletedTodos, completeTodo };
