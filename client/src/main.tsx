import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import Home, { loader as homeLoader } from "./pages/Home";
import LogIn, { action as loginAction } from "./pages/LogIn";
import Salads, { loader as saladsLoader } from "./pages/Salads";
import AddIngredient, {
  loader as AddIngredientLoader,
  action as AddIngredientAction,
} from "./pages/dashboard/AddIngredient";
import AddSalad, {
  loader as AddSaladLoader,
  action as AddSaladAction,
} from "./pages/dashboard/AddSalad";
import Dashboard from "./pages/dashboard/Dashboard";
import Products, { loader as productsLoader } from "./pages/dashboard/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/nos-salades",
        element: <Salads />,
        loader: saladsLoader,
      },
      {
        path: "login",
        element: <LogIn />,
        action: loginAction,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "ajout-ingredient",
        element: <AddIngredient />,
        loader: AddIngredientLoader,
        action: AddIngredientAction,
      },
      {
        path: "ajout-salade",
        element: <AddSalad />,
        loader: AddSaladLoader,
        action: AddSaladAction,
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
    </React.StrictMode>,
  );
}
