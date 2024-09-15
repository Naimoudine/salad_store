import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import LogIn, { action as loginAction } from "./pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LogIn />,
        action: loginAction,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      ,
    </React.StrictMode>,
  );
}
