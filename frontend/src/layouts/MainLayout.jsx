import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";
import useThemeStore from "../store/theme";
import Button from "../components/Button";
import { Sun, Moon } from "lucide-react";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function MainLayout({ children }) {
  const { logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md h-screen p-6 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">ProU Admin</h2>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 hover:text-brand dark:hover:text-brand-light"
          >
            <HomeIcon className="h-5 w-5" /> Dashboard
          </Link>

          <Link
            to="/employees"
            className="flex items-center gap-3 hover:text-brand dark:hover:text-brand-light"
          >
            <UserGroupIcon className="h-5 w-5" /> Employees
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 hover:text-brand dark:hover:text-brand-light"
          >
            <ClipboardDocumentListIcon className="h-5 w-5" /> Tasks
          </Link>
        </nav>

        {/* LOGOUT BUTTON */}
        <Button
          onClick={logout}
          className="text-red-600 bg-transparent hover:bg-red-100 
                     dark:hover:bg-red-900 mt-auto"
        >
          Logout
        </Button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 transition">
        {children}
      </main>
    </div>
  );
}
