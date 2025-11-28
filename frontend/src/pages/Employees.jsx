import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { useState } from "react";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
import Button from "../components/Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import useAuthStore from "../store/auth";

export default function Employees() {
  const queryClient = useQueryClient();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  const { role } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["employees", search],
    queryFn: async () =>
      (await api.get(`/employees?search=${search}`)).data.data,
  });

  const addMutation = useMutation({
    mutationFn: (body) => api.post("/employees", body),
    onSuccess: () => {
      toast.success("Employee added successfully!");
      queryClient.invalidateQueries(["employees"]);
      setOpenAdd(false);
    },
    onError: () => toast.error("Failed to add employee"),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/employees/${id}`, body),
    onSuccess: () => {
      toast.success("Employee updated successfully!");
      queryClient.invalidateQueries(["employees"]);
      setOpenEdit(false);
    },
    onError: () => toast.error("Failed to update employee"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/employees/${id}`),
    onSuccess: () => {
      toast.success("Employee deleted successfully!");
      queryClient.invalidateQueries(["employees"]);
    },
    onError: () => toast.error("Failed to delete employee"),
  });

  // ----------------------------------------------------------------
  // LOADING SKELETON
  // ----------------------------------------------------------------
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between mb-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-10 w-64 mb-4" />

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 dark:bg-gray-700">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>

          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
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

  // ----------------------------------------------------------------
  // MAIN UI
  // ----------------------------------------------------------------
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Employees
        </h2>

        {role === "admin" && (
          <Button
            onClick={() => setOpenAdd(true)}
            className="bg-blue-600 dark:bg-blue-500 text-white"
          >
            Add Employee
          </Button>
        )}
      </div>

      {/* SEARCH INPUT */}
      <input
        placeholder="Search employees..."
        className="w-64 mb-4 p-3 rounded-lg bg-white dark:bg-gray-700
                   border border-gray-300 dark:border-gray-600
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-500 dark:placeholder-gray-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="w-full bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        <thead>
          <tr className="border-b bg-gray-100 dark:bg-gray-700">
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Name</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Email</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Phone</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Position</th>
            <th className="p-3 text-left text-gray-900 dark:text-gray-100">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((emp) => (
            <motion.tr
              key={emp._id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-3 text-gray-900 dark:text-gray-100">{emp.name}</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">{emp.email}</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">{emp.phone}</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">{emp.position}</td>

              <td className="p-3 flex gap-3">
                <Button
                  className="text-blue-600 dark:text-blue-400 
                             bg-transparent hover:bg-blue-100 
                             dark:hover:bg-blue-900"
                  onClick={() => {
                    setEditData(emp);
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
                    onClick={() => deleteMutation.mutate(emp._id)}
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
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Add Employee">
        <EmployeeForm onSubmit={(body) => addMutation.mutate(body)} />
      </Modal>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Employee">
        <EmployeeForm
          initialData={editData}
          onSubmit={(body) => editMutation.mutate({ id: editData._id, body })}
        />
      </Modal>
    </div>
  );
}
