import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MotionLayout from "../components/MotionLayout";
import { motion } from "framer-motion";
import api from "../lib/api";
import toast from "react-hot-toast";
import useAuthStore from "../store/auth";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const [showPw, setShowPw] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "manager",
    });

    const handleChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            }); // FIXED ENDPOINT

            toast.success("Registered successfully!");
            const res = await api.post("/auth/login", {
                email: data.email,
                password: data.password,
            }); // AUTO LOGIN AFTER REGISTER

            // Save token & role to auth store so ProtectedRoute treats user as logged in
            login(res.data.token, res.data.role);
            toast.success("Logged in");
            navigate("/");

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to register");
        }
    };

    return (
        <MotionLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">

                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700">

                    {/* Left Illustration */}
                    <div className="hidden md:flex items-center justify-center p-10 bg-gray-100 dark:bg-gray-700">
                        <img
                            src="https://illustrations.popsy.co/amber/businessman-with-a-suitcase.svg"
                            alt="Register Illustration"
                            className="w-[80%] drop-shadow-xl"
                        />
                    </div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-10"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                            Register Your Account ✨
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <input
                                name="name"
                                placeholder="Full Name"
                                value={data.name}
                                onChange={handleChange}
                                className="p-3 rounded-xl bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                            />

                            <input
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={handleChange}
                                className="p-3 rounded-xl bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                            />

                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="p-3 rounded-xl w-full bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                                >
                                    {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <select
                                name="role"
                                value={data.role}
                                onChange={handleChange}
                                className="p-3 rounded-xl bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                            >
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>

                            <button className="w-full py-3 rounded-xl bg-green-600 dark:bg-green-500 text-white text-lg font-medium mt-4">
                                Register
                            </button>

                            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                                >
                                    Login
                                </Link>
                            </p>

                        </form>
                    </motion.div>
                </div>
            </div>
        </MotionLayout>
    );
}
