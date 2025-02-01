import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PasswordInput from "../components/PasswordInput";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Redirect to signin after successful signup
      window.location.href = "/signin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#eeebe2] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-[#faf9f5] border border-[#e5e2d9] rounded-3xl p-8 shadow-lg">
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-[#c15f3c] hover:text-[#a34832] transition-colors mb-6"
            >
              <FiArrowLeft className="mr-2" /> Back to home
            </Link>
            <h2 className="mt-4 text-3xl font-greeting font-bold text-claude-text-light-primary">
              Create your account
            </h2>
            <p className="mt-2 text-base font-content text-claude-text-light-secondary">
              Please enter your details to sign up.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm font-content text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-content text-claude-text-light-primary"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-3 bg-white text-claude-text-light-primary 
                           placeholder:text-claude-text-light-secondary focus:outline-none 
                           border border-[#e5e2d9] hover:border-[#d1cec5] focus:border-[#d1cec5]
                           rounded-lg transition-colors font-content"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-content text-claude-text-light-primary"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-3 bg-white text-claude-text-light-primary 
                           placeholder:text-claude-text-light-secondary focus:outline-none 
                           border border-[#e5e2d9] hover:border-[#d1cec5] focus:border-[#d1cec5]
                           rounded-lg transition-colors font-content"
                  placeholder="Enter your email"
                />
              </div>

              <PasswordInput
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Create password"
              />

              <PasswordInput
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Confirm password"
                name="confirmPassword"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#c15f3c] text-white hover:bg-[#a34832] 
                       rounded-lg transition-colors font-content"
            >
              Sign up
            </button>

            <p className="text-center text-sm font-content text-claude-text-light-secondary">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#c15f3c] hover:text-[#a34832] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
