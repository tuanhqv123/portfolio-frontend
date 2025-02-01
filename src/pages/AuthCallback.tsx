import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userStr = params.get("user");
    const error = params.get("error");

    if (error) {
      console.error("Authentication error:", error);
      navigate("/signin?error=" + encodeURIComponent(error));
      return;
    }

    if (!token || !userStr) {
      navigate("/signin");
      return;
    }

    try {
      const user = JSON.parse(userStr);

      // Lưu token
      localStorage.setItem("token", token);

      // Set user trong context với remember me = true cho OAuth
      setUser(user, true);

      // Chuyển về trang chủ
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error processing callback:", error);
      navigate("/signin");
    }
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c15f3c]"></div>
    </div>
  );
};

export default AuthCallback;
