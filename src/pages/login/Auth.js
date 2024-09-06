import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the styles are imported

export const RequireAuth = () => {
  const auth = sessionStorage.getItem("token");
  console.log("auth", auth);
  useEffect(() => {
    if (!auth) {
      toast.error("Please log in before proceeding.", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [auth]);
  if (!auth) {
    return <Navigate to="/" />;
  } else {
    return <Outlet></Outlet>;
  }
};
