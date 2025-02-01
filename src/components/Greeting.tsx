import React from "react";
import { useAuth } from "../context/AuthContext";

const Greeting: React.FC = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-greeting mb-4">
        {greeting}, {user ? user.username : "Guest"}
      </h1>
      <p className="text-lg font-content text-gray-600">
        Welcome to my portfolio website. I'm a passionate developer who loves
        creating beautiful and functional web applications.
      </p>
    </div>
  );
};

export default Greeting;
