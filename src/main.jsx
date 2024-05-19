import { StrictMode } from "react";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { router } from "./routes/Routes";
// import { router } from "./routes/Routes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);