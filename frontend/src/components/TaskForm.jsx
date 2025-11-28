import { useState, useEffect } from "react";

export default function TaskForm({ initialData, employees = [], onSubmit }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignee: "",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        status: initialData.status || "todo",
        assignee: initialData.assignee?._id || "",
        dueDate: initialData.dueDate
          ? initialData.dueDate.split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
    >
      <input
        name="title"
        placeholder="Title"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:placeholder-gray-300 border dark:border-gray-600"
        value={data.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:placeholder-gray-300 border dark:border-gray-600"
        value={data.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:border-gray-600"
        value={data.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        name="status"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:border-gray-600"
        value={data.status}
        onChange={handleChange}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        name="assignee"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:border-gray-600"
        value={data.assignee}
        onChange={handleChange}
      >
        <option value="">Unassigned</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="dueDate"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:border-gray-600"
        value={data.dueDate}
        onChange={handleChange}
      />

      <button className="bg-green-600 text-white py-2 rounded">
        Save
      </button>
    </form>
  );
}
