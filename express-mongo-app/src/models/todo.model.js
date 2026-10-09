import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      trim: true,
      maxlength: [200, "Todo title cannot exceed 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
