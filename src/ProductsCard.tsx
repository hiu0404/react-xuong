import { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "./types/Product";
import { useCart } from "./components/contexts/cart";
import { useProductCart } from "./hooks/useProductCart";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useProductCart();
  const [quantity] = useState<number>(1);
  const handleAddToCart = async (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };
  return (
    <Stack>
      <Box width="100%" marginTop="50px">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={product.thumbnail}
            alt="Product Thumbnail"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <a
                href={`/product/${product._id}`}
                className="btn btn-primary"
                style={{ textDecoration: "none" }}
              >
                {product.title}
              </a>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography
              sx={{ color: "#64b496", fontWeight: "700" }}
              variant="body2"
            >
              ${product.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleAddToCart(product)}
              sx={{ backgroundColor: "#20c997" }}
              variant="outlined"
            >
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Stack>
  );
};

export default ProductCard;
