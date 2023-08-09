import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      <HelmetProvider>
        <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </React.StrictMode>
);
