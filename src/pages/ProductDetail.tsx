import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import instance from "../apis";
import Loading from "../components/Loading";

import { Product } from "../types/Product";
import { useProductCart } from "../hooks/useProductCart";

function ProductDetail() {
  const { addToCart } = useProductCart();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleAddToCart = async (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };

  return (
    <>
      <Loading isShow={loading} />
      <Container>
        {product && (
          <Stack
            direction={"row"}
            gap={3}
            justifyContent="flex-start"
            marginTop="50px"
          >
            <Stack sx={{ backgroundColor: "#f8f9fa" }}>
              <Typography
                sx={{ borderBottom: "1px solid #e9e9e9" }}
                variant="h5"
              >
                Category
              </Typography>
              <Typography>
                <Checkbox /> Juice & Drinks [20]
              </Typography>
              <Typography>
                <Checkbox /> Dairy & Milk [54]
              </Typography>
              <Typography>
                <Checkbox /> Snack & Spice [64]
              </Typography>
              <Typography
                sx={{ borderBottom: "1px solid #e9e9e9" }}
                variant="h5"
              >
                Price
              </Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  marks={[
                    { value: 0, label: "0" },
                    { value: 100, label: "100" },
                  ]}
                  min={0}
                  max={100}
                />
              </Box>
              <Typography variant="h5">Price: $1-$100</Typography>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "#20c997", color: "#fff" }}
              >
                Filter
              </Button>
              <Typography
                sx={{ borderBottom: "1px solid #e9e9e9" }}
                variant="h5"
              >
                Colors
              </Typography>
              <Typography>
                <Checkbox /> Blue
              </Typography>
              <Typography>
                <Checkbox /> Yellow
              </Typography>
              <Typography>
                <Checkbox /> Red
              </Typography>
              <Typography>
                <Checkbox /> Green
              </Typography>
              <Typography
                sx={{ borderBottom: "1px solid #e9e9e9" }}
                variant="h5"
              >
                Weight
              </Typography>
              <Typography>
                <Checkbox /> 2kg Pack
              </Typography>
              <Typography>
                <Checkbox /> 20kg Pack
              </Typography>
              <Typography>
                <Checkbox /> 30kg Pack
              </Typography>
            </Stack>
            <Stack>
              <img src={product.thumbnail} alt="" width={"100%"} />
            </Stack>
            <Stack gap={3}>
              <Typography component="h1" fontSize={"26px"}>
                {product.title}
              </Typography>
              <Typography fontWeight={"bold"} color={"Highlight"}>
                ${product.price}
              </Typography>
              <Typography>{product.description}</Typography>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Typography>Quantity: </Typography>
                <IconButton
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Stack>
              <Button
                onClick={() => handleAddToCart(product)}
                sx={{ backgroundColor: "#20c997" }}
                variant="outlined"
              >
                Add to cart
              </Button>
            </Stack>
          </Stack>
        )}
      </Container>
    </>
  );
}

export default ProductDetail;
