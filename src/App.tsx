import { useRoutes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import HomePage from "./pages/HomePage";
import NotFound from "./NotFound/NotFound";
import LayoutClient from "./components/LayoutClient";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LayoutAdmin from "./components/LayoutAdmin";
import List from "./pages/Admin/List";
import Add from "./pages/Admin/Add";
import Edit from "./pages/Admin/Edit";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
const routeConfig = [
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/admin/list",
        element: <List />,
      },
      {
        path: "/admin/add",
        element: <Add />,
      },
      {
        path: "/admin/edit/:id",
        element: <Edit />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "product/:id", element: <ProductDetail /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/cars",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
  const routes = useRoutes(routeConfig);
  return (
    <div>
      <main>{routes}</main>
    </div>
  );
}

export default App;
