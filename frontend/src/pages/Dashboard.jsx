import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => (await api.get("/analytics/summary")).data.data,
  });

  const pieData = [
    { name: "Todo", value: data?.tasksTodo },
    { name: "In Progress", value: data?.tasksInProgress },
    { name: "Done", value: data?.tasksDone },
  ];

  const COLORS = ["#f43f5e", "#f59e0b", "#22c55e"];

  return (
    <div>

      {/* Header */}
      <motion.h2
        className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard Overview
      </motion.h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Tasks" value={data?.totalTasks} />
        <StatCard label="Employees" value={data?.employees} />
        <StatCard label="Completed" value={data?.tasksDone} />
        <StatCard label="Pending" value={data?.tasksTodo} />
      </div>

      {/* Pie Chart Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Task Distribution
        </h3>

        {/* FIX: Add height so ResponsiveContainer can render */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              {/* Dark Mode Tooltip Fix */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937", // dark gray
                  border: "1px solid #374151",
                  color: "#f3f4f6"
                }}
                itemStyle={{
                  color: "#f3f4f6"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 
        bg-white dark:bg-gray-800 
        rounded-xl shadow dark:shadow-none 
        border border-gray-200 dark:border-gray-700 
        transition-all"
    >
      <h3 className="text-lg text-gray-700 dark:text-gray-300">{label}</h3>
      <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </motion.div>
  );
}
