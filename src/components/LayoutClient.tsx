import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useCart } from "./contexts/cart";
import instance from "../apis";
import { useEffect } from "react";
import { useUser } from "./contexts/user";

const LayoutClient = () => {
  const { setCart } = useCart();
  const { setUser } = useUser();
  const getAllCarts = async () => {
    try {
      const userStorage = localStorage.getItem("user") || "{}";
      const user = JSON.parse(userStorage);
      setUser(user);
      if (!user) return;
      const { data } = await instance.get(`/carts/user/${user._id}`);
      setCart(data.products.length);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCarts();
  }, [setCart]);
  return (
    <div>
      <Header />;
      <Outlet />;<Footer />;
    </div>
  );
};

export default LayoutClient;
