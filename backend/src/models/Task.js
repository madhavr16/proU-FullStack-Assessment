import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    dueDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
