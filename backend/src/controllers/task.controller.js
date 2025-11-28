import Task from "../models/Task.js";

// CREATE
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json({ success: true, data: task });
};

// READ with filters
export const getTasks = async (req, res) => {
  const {
    search = "",
    status,
    priority,
    assignee,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {
    title: { $regex: search, $options: "i" },
  };

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignee) query.assignee = assignee;

  const tasks = await Task.find(query)
    .populate("assignee")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);

  res.json({
    success: true,
    data: tasks,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};

// READ ONE
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignee");
  res.json({ success: true, data: task });
};

// UPDATE
export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("assignee");

  res.json({ success: true, data: updated });
};

// DELETE
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Task deleted" });
};
