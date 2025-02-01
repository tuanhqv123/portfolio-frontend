import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PasswordInput from "../components/PasswordInput";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/password/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to send verification code"
        );
      }

      const data = await response.json();
      setSuccess(data.message);
      setStep("verify");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send verification code"
      );
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/password/verify-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, code: formData.code }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid verification code");
      }

      const data = await response.json();
      setSuccess(data.message);
      setStep("reset");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify code");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/password/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            code: formData.code,
            newPassword: formData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      const data = await response.json();
      setSuccess(data.message);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-[#eeebe2] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-[#faf9f5] border border-[#e5e2d9] rounded-3xl p-8 shadow-lg">
          <div>
            <Link
              to="/signin"
              className="inline-flex items-center text-[#c15f3c] hover:text-[#a34832] transition-colors mb-6"
            >
              <FiArrowLeft className="mr-2" /> Back to sign in
            </Link>
            <h2 className="mt-4 text-3xl font-greeting font-bold text-claude-text-light-primary">
              Reset your password
            </h2>
            <p className="mt-2 text-base font-content text-claude-text-light-secondary">
              {step === "email"
                ? "Enter your email to receive a verification code"
                : step === "verify"
                ? "Enter the verification code sent to your email"
                : "Create a new password"}
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-content text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm font-content text-center">
              {success}
            </div>
          )}

          {step === "email" && (
            <form className="mt-8 space-y-6" onSubmit={handleSendCode}>
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
                  className="mt-1 block w-full px-4 py-3 bg-white text-claude-text-light-primary 
                           placeholder:text-claude-text-light-secondary focus:outline-none 
                           border border-[#e5e2d9] hover:border-[#d1cec5] focus:border-[#d1cec5]
                           rounded-lg transition-colors font-content"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#c15f3c] text-white hover:bg-[#a34832] 
                         rounded-lg transition-colors font-content"
              >
                Send verification code
              </button>
            </form>
          )}

          {step === "verify" && (
            <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-content text-claude-text-light-primary"
                >
                  Verification code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white text-claude-text-light-primary 
                           placeholder:text-claude-text-light-secondary focus:outline-none 
                           border border-[#e5e2d9] hover:border-[#d1cec5] focus:border-[#d1cec5]
                           rounded-lg transition-colors font-content"
                  placeholder="Enter verification code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#c15f3c] text-white hover:bg-[#a34832] 
                         rounded-lg transition-colors font-content"
              >
                Verify code
              </button>
            </form>
          )}

          {step === "reset" && (
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <PasswordInput
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="New password"
                  name="newPassword"
                />

                <PasswordInput
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                  name="confirmPassword"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#c15f3c] text-white hover:bg-[#a34832] 
                         rounded-lg transition-colors font-content"
              >
                Reset password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
