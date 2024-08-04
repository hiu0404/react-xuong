import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import instance from "../apis";
import { CartItem } from "../types/Product";

function Checkout() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  useEffect(() => {
    const fetchCartItems = async () => {
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

    fetchCartItems();
  }, []);

  const totalPrice = carts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return (
    <>
      <Container sx={{ mb: 10 }}>
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
            Checkout
          </Typography>
          <Typography
            marginRight={"20px"}
            sx={{ fontSize: "17px", fontWeight: "600" }}
          >
            <Link to={"/"}>Home</Link> - Checkout
          </Typography>
        </Stack>

        <Stack direction={"row"} gap={5} marginTop={"80px"}>
          <Stack
            spacing={3}
            border={"1px solid #e9e9e9"}
            sx={{
              marginBottom: "30px",
              padding: "20px",
              borderRadius: "5px",
              bgcolor: "#fff",
              width: "100%",
              height: "100%",
            }}
          >
            {carts.map((item, index) => (
              <Stack key={index} direction={"row"} alignItems={"center"}>
                <Typography>
                  <img src={item.product.thumbnail} alt="" width={"60%"} />
                </Typography>
                <Box>
                  <Typography fontWeight={"bold"}>
                    {item.product.title} x {item.quantity}
                  </Typography>
                  <Typography sx={{ color: "#64b496" }} fontWeight={"bold"}>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            ))}
            <Stack direction={"row"} justifyContent={"flex-end"} mt={3}>
              <Typography variant="h6" fontWeight={"bold"}>
                Total:$ {totalPrice.toLocaleString()}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              padding: "24px",
              border: "1px solid #e9e9e9",
              bgcolor: "#fff",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Stack>
                <Stack>
                  <Typography
                    sx={{
                      m: 1,
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#2b2b2d",
                    }}
                  >
                    Billing Details
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    sx={{
                      m: 1,
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#2b2b2d",
                    }}
                  >
                    Checkout Options
                  </Typography>
                </Stack>
              </Stack>
              <div>
                <TextField
                  label="First Name*"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "40ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={{ width: "40ch" }} variant="outlined">
                  <TextField
                    label="Last Name*"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: "82ch" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Address
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </div>
              <div>
                <TextField
                  label="City *"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "40ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={{ width: "40ch" }} variant="outlined">
                  <TextField
                    label="Post Code"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div>
                <TextField
                  label="Country *"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "40ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={{ width: "40ch" }} variant="outlined">
                  <TextField
                    label="Region State"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "40ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </Box>
            <Button
              sx={{
                bgcolor: "#64b496",
                height: "40px",
                padding: "8px 22px",
                fontSize: "14px",
                fontWeight: "bold",
                width: "150px",
                color: "#fff",
              }}
            >
              Place Order
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Checkout;
