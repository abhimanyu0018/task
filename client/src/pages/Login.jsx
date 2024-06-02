import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // console.log(formData);

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/user/${
        isLogin ? "/login" : "/signup"
      }`;

      // console.log(url);

      const data = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      console.log(data);

      const response = await fetch(`${url}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "An error occurred");
        return;
      }

      if (result.success) {
        setSuccess(result.message);
        if (result.token) {
          login(result.token);
        }
      } else {
        setError(result.message || "An error occurred");
      }

      navigate("/posts");
    } catch (error) {
      setError(`An error occurred ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600"
            >
              {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
            </button>
          </div>
          {!isLogin && (
            <div className="mb-4 relative">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
              </button>
            </div>
          )}
          {!isLogin && (
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" required className="mr-2" />I agree to
                the terms and conditions
              </label>
            </div>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button onClick={toggleForm} className="w-full text-blue-500 mt-4">
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </button>
      </motion.div>
    </div>
  );
};

export default AuthForm;
