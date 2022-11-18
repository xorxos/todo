import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

import ToDo from "../models/ToDo.js";

const createTodo = async (req, res) => {
  const { todo } = req.body;

  if (!todo) throw new BadRequestError("Please provide all values");

  await ToDo.create(req.body);
  const updatedTodoList = await ToDo.find({});
  const totalItems = await ToDo.countDocuments();
  res.status(StatusCodes.CREATED).json({ updatedTodoList, totalItems });
};

const getAllTodos = async (req, res) => {
  const todoItems = await ToDo.find({});
  const totalItems = await ToDo.countDocuments();
  res.status(StatusCodes.OK).json({ todoItems, totalItems });
};

const changeTodoStatus = async (req, res) => {
  const { id: todoId } = req.params;

  // check if todo is found
  const todo = await ToDo.findOne({ _id: todoId });
  if (!todo) throw new NotFoundError(`No todo found with id: ${todoId}`);

  let newTodoStatus = "completed";
  if (todo.status === "completed") {
    newTodoStatus = "pending";
  }

  // change todo to completed
  const updatedTodo = await ToDo.findOneAndUpdate(
    { _id: todoId },
    { status: newTodoStatus },
    { new: true }
  );

  const updatedTodoList = await ToDo.find({});
  const totalItems = await ToDo.countDocuments();
  res.status(StatusCodes.OK).json({ updatedTodoList, totalItems });
};

const clearCompletedTodos = async (req, res) => {
  const completedTodos = await ToDo.find({ status: "completed" });
  const idList = completedTodos.map((item) => item._id);
  await ToDo.deleteMany({ _id: { $in: idList } });

  const updatedTodoList = await ToDo.find({});
  const totalItems = await ToDo.countDocuments();
  res.status(StatusCodes.OK).json({ updatedTodoList, totalItems });
};

export { createTodo, getAllTodos, clearCompletedTodos, changeTodoStatus };
