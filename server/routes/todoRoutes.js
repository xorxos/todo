import express from "express";

const router = express.Router();

import {
  createTodo,
  getAllTodos,
  clearCompletedTodos,
  changeTodoStatus,
} from "../controllers/todoController.js";

router.route("/").post(createTodo).get(getAllTodos);
router.route("/:id").patch(changeTodoStatus);
router.route("/clear").post(clearCompletedTodos);

export default router;
