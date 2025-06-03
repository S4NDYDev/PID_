import { createBrowserRouter } from "react-router-dom";
import { Error404 } from "../pages/404";
import { Home } from "../pages/home";
import Specialists from "../pages/specialists";
import Services from "../pages/services";
import { Layout } from "../layout";
import Login from "../pages/login";
import Register from "../pages/register";
import Contact from "../pages/contact";
import Appointments from "../pages/appointments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/specialists",
        element: <Specialists />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
    ]
  },
  {
    path: "*",
    element: <Layout />,
    children:[
      {
        path: "*",
        element: <Error404 />,
      }
    ]
  },
]);

export { router };
