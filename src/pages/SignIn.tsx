import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import PasswordInput from "../components/PasswordInput";
import { AUTH_ENDPOINTS, fetchApi } from "../config/api";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetchApi(AUTH_ENDPOINTS.SIGNIN, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Lưu token vào localStorage
      localStorage.setItem("token", response.token);

      // Set user trong context
      setUser(response.user, rememberMe);

      // Chuyển hướng về trang chủ và thay thế history
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = AUTH_ENDPOINTS.GOOGLE;
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
              Welcome back
            </h2>
            <p className="mt-2 text-base font-content text-claude-text-light-secondary">
              Please enter your details to sign in.
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
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-white text-claude-text-light-primary 
                           placeholder:text-claude-text-light-secondary focus:outline-none 
                           border border-[#e5e2d9] hover:border-[#d1cec5] focus:border-[#d1cec5]
                           rounded-lg transition-colors font-content"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-content text-claude-text-light-primary"
                >
                  Password
                </label>
                <PasswordInput
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 accent-[#c15f3c]"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-content text-claude-text-light-secondary"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-content text-[#c15f3c] hover:text-[#a34832] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-[#c15f3c] text-white hover:bg-[#a34832] 
                         rounded-lg transition-colors font-content"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e2d9]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#faf9f5] text-claude-text-light-secondary font-content">
                  or
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full px-4 py-3 bg-white text-claude-text-light-primary 
                         border border-[#e5e2d9] hover:border-[#d1cec5]
                         rounded-lg transition-colors font-content flex items-center justify-center gap-2"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>

            <p className="text-center text-sm font-content text-claude-text-light-secondary">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#c15f3c] hover:text-[#a34832] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
