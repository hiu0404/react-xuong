import { useEffect, useState } from "react";
import instance from "../apis";

import {
  Button,
  Container,
  styled,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { useProductCart } from "../hooks/useProductCart";
import { CartItem } from "../types/Product";

const labels = ["Product", "Price", "Quantity", "Subtotal", "Action"];

const Cart = () => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const { removeToCart, getCartUser } = useProductCart();

  const getAllCarts = async () => {
    try {
      const userStorage = localStorage.getItem("user") || "{}";
      const userId = JSON.parse(userStorage)?._id;

      if (!userId) return;
      const { data } = await instance.get(`/carts/user/${userId}`);
      setCarts(data.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) return;
    try {
      const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      const cartId = carts[0]?.product._id;

      if (!cartId) return;

      await instance.put(`/carts/${cartId}`, {
        product: productId,
        quantity: newQuantity,
        user: userId,
      });
      getCartUser();
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate total price
  const totalPrice = carts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
        mb={2}
        sx={{ bgcolor: "#e4f2ed", width: "100%", height: "70px" }}
      >
        <Typography
          marginLeft={"20px"}
          sx={{ fontSize: "17px", fontWeight: "600" }}
        >
          Cart
        </Typography>
        <Typography
          marginRight={"20px"}
          sx={{ fontSize: "17px", fontWeight: "600" }}
        >
          <Link to={"/"}>Home</Link> - Cart
        </Typography>
      </Stack>
      <Container>
        <Wrapper>
          <LabelWrapper
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            {labels.map((label, index) => (
              <Typography fontWeight={500} key={index}>
                {label}
              </Typography>
            ))}
          </LabelWrapper>
          {/* Cart Item */}
          <Stack gap={3} sx={{ bgcolor: "#f7f7f8" }}>
            {carts.map((item, index) => {
              const subtotal = item.product.price * item.quantity;
              return (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} alignItems={"center"}>
                    <img
                      src={item.product.thumbnail}
                      width={"100px"}
                      alt={item.product.title}
                    />
                    <Typography fontWeight={500}>
                      {item.product.title.substring(0, 10)}...
                    </Typography>
                  </Stack>

                  <Typography fontWeight={500}>
                    ${item.product.price}
                  </Typography>

                  {/* Quantity Control */}
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography fontWeight={500}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>

                  <Typography fontWeight={500}>
                    ${subtotal.toLocaleString()}
                  </Typography>
                  <IconButton onClick={() => removeToCart(item.product._id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
          {/* Total Price */}
          <Stack direction={"row"} justifyContent={"flex-end"} mt={3}>
            <Typography variant="h6" fontWeight={700}>
              Total:$ {totalPrice.toLocaleString()}
            </Typography>
          </Stack>
        </Wrapper>
        <Stack alignItems={"center"}>
          <Link to="/checkout">
            <Button variant="contained" sx={{ mb: 10 }}>
              Checkout
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default Cart;

const Wrapper = styled(Stack)({
  padding: 72,
});

const LabelWrapper = styled(Stack)(() => ({
  background: "#e9e9e9",
  height: 55,
}));
