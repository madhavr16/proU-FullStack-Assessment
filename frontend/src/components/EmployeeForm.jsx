import { useState, useEffect } from "react";

export default function EmployeeForm({ initialData, onSubmit }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        position: initialData.position || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
      className="flex flex-col gap-3"
    >
      <input
        name="name"
        placeholder="Name"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:placeholder-gray-300 border dark:border-gray-600"
        value={data.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:placeholder-gray-300 border dark:border-gray-600"
        value={data.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:placeholder-gray-300 border dark:border-gray-600"
        value={data.phone}
        onChange={handleChange}
      />

      <input
        name="position"
        placeholder="Position"
        className="input bg-white dark:bg-gray-700 dark:text-gray-100 
        dark:placeholder-gray-300 border dark:border-gray-600"
        value={data.position}
        onChange={handleChange}
      />

      <button className="bg-blue-600 text-white py-2 mt-2 rounded">
        Save
      </button>
    </form>
  );
}
