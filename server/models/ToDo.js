import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Please provide a todo"],
    maxlength: 200,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

export default mongoose.model("ToDo", ToDoSchema);
