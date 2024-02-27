import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/user/Login";
import Navbar from "./Components/Layouts/Navbar";
import PrivateRoute from "./Components/Layouts/PrivateRoute";
import Notebook from "./Components/Notebook/Notebook";
import Home from "./Components/Home";
import MainTask from "./Components/Task/MainTask";
import { AnimatePresence } from "framer-motion";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Navbar />,
        children: [
          {
            path: "/notebooks",
            element: <Notebook />,
          },
          {
            path: "/tasks",
            element: <MainTask />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
