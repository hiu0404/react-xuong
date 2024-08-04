import axios from "axios";
import { useUser } from "../components/contexts/user";
import { Product } from "../types/Product";
import { useCart } from "../components/contexts/cart";
import instance from "../apis";
import { useNavigate } from "react-router-dom";

type AddToCart = {
  product: Product;
  quantity: number;
};

export const useProductCart = () => {
  const { user, setUser } = useUser();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const getCartUser = async () => {
    const userStorage = localStorage.getItem("user") || "{}";
    const user = JSON.parse(userStorage);
    setUser(user);
    if (!user._id) return;
    const { data } = await instance.get(`/carts/user/${user._id}`);
    setCart(data);
  };

  const addToCart = async ({ product, quantity }: AddToCart) => {
    if (!user) return;
    const price = product.price * quantity;
    if (!cart) {
      try {
        await instance.post("/carts", {
          product,
          quantity,
          price,
          user: user._id,
        });
        alert("Thêm thành công");
        getCartUser();
      } catch (error) {}
    } else {
      try {
        await instance.put(`/carts/${cart._id}`, {
          product,
          quantity,
          price,
          user: user._id,
        });
        getCartUser();
      } catch (error) {}
    }
  };
  const removeToCart = async (productId: string) => {
    if (!user) return;
    if (window.confirm("Xóa giỏ hàng")) {
      try {
        await instance.delete(`/carts/user/${user._id}/product/${productId}`);

        getCartUser();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { addToCart, removeToCart, getCartUser };
};
