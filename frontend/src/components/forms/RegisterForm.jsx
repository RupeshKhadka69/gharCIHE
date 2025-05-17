import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const [role, setRole] = useState("user");

  const password = watch("password");

  const onSubmit = (data) => {
    clearError();
    registerUser({ ...data, role });
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name cannot be more than 50 characters",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white"
            placeholder="Enter your phone number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Account Type</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="user"
                name="role"
                className="mr-2"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              <label htmlFor="user" className="text-gray-300">
                Student
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="owner"
                name="role"
                className="mr-2"
                checked={role === "owner"}
                onChange={() => setRole("owner")}
              />
              <label htmlFor="owner" className="text-gray-300">
                Property Owner
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-4 text-center text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 hover:text-red-400">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;