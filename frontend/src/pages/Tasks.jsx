import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { useState } from "react";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import Button from "../components/Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import useAuthStore from "../store/auth";

export default function Tasks() {
  const queryClient = useQueryClient();
  const { role } = useAuthStore();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await api.get("/employees")).data.data,
  });

  const tasks = useQuery({
    queryKey: ["tasks", search, filterStatus],
    queryFn: async () =>
      (await api.get(`/tasks?search=${search}&status=${filterStatus}`)).data
        .data,
  });

  const addMutation = useMutation({
    mutationFn: (body) => api.post("/tasks", body),
    onSuccess: () => {
      toast.success("Task added successfully!");
      queryClient.invalidateQueries(["tasks"]);
      setOpenAdd(false);
    },
    onError: () => toast.error("Failed to add task"),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/tasks/${id}`, body),
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(["tasks"]);
      setOpenEdit(false);
    },
    onError: () => toast.error("Failed to update task"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: () => toast.error("Failed to delete task"),
  });

  // ----------------------------------------------------
  // LOADING SKELETON
  // ----------------------------------------------------
  if (tasks.isLoading) {
    return (
      <div>
        <div className="flex justify-between mb-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="flex gap-4 mb-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 dark:bg-gray-700">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton className="h-6" key={i} />
              ))}
          </div>

          <div className="p-4 space-y-3">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-4">
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN PAGE
  // ----------------------------------------------------
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Tasks
        </h2>

        {role === "admin" && (
          <Button className="bg-blue-600 dark:bg-blue-500 text-white" onClick={() => setOpenAdd(true)}>
            Add Task
          </Button>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-4 mb-4">
        {/* SEARCH */}
        <input
          placeholder="Search tasks..."
          className="w-64 p-3 rounded-lg bg-white dark:bg-gray-700 
                     border border-gray-300 dark:border-gray-600 
                     text-gray-900 dark:text-gray-100
                     placeholder-gray-500 dark:placeholder-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* STATUS FILTER */}
        <select
          className="p-3 rounded-lg bg-white dark:bg-gray-700 
                     border border-gray-300 dark:border-gray-600 
                     text-gray-900 dark:text-gray-100"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* TASKS TABLE */}
      <table className="w-full bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        <thead>
          <tr className="border-b bg-gray-100 dark:bg-gray-700">
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Title</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Priority</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Status</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Assignee</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.data?.map((task) => (
            <motion.tr
              key={task._id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-3 text-gray-900 dark:text-gray-100">{task.title}</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">{task.priority}</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">{task.status}</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">
                {task.assignee?.name || "-"}
              </td>

              <td className="p-3 flex gap-3">
                <Button
                  className="text-blue-600 dark:text-blue-400 
                             bg-transparent hover:bg-blue-100 
                             dark:hover:bg-blue-900"
                  onClick={() => {
                    setEditData(task);
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>

                {role === "admin" && (
                  <Button
                    className="text-red-600 dark:text-red-400 
                               bg-transparent hover:bg-red-100 
                               dark:hover:bg-red-900"
                    onClick={() => deleteMutation.mutate(task._id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Add Task">
        <TaskForm
          employees={employees.data || []}
          onSubmit={(body) => addMutation.mutate(body)}
        />
      </Modal>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Task">
        <TaskForm
          employees={employees.data || []}
          initialData={editData}
          onSubmit={(body) => editMutation.mutate({ id: editData._id, body })}
        />
      </Modal>
    </div>
  );
}
