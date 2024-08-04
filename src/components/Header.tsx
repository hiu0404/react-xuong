import { Badge, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useMemo } from "react";
import danhmuc from "../assets/images/options-lines.png";

import { Link as RouterLink } from "react-router-dom";
import cartt from "../assets/images/cart.png";
import heart from "../assets/images/heart.png";
import logo from "../assets/images/logo.png";
import user from "../assets/images/user.png";
import { useCart } from "./contexts/cart";

const Header = () => {
  const { cart } = useCart();

  const quantityCart = useMemo(() => {
    if (!cart || !cart.products) {
      return 0;
    }
    return cart.products.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <Stack>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        sx={{ backgroundColor: "#fff", padding: "20px 0px", color: "#212529" }}
      >
        <Typography>
          <img src={logo} alt="" />
        </Typography>
        <Stack direction={"row"} sx={{ padding: "1px 175px 1px 175px" }}>
          <TextField
            sx={{ border: "1px solid #20c997" }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <TextField
            sx={{ border: "1px solid #20c997", width: "130px" }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <Button variant="contained" sx={{ backgroundColor: "#20c997" }}>
            Tìm kiếm
          </Button>
        </Stack>
        <Stack direction={"row"} gap={3}>
          <Typography>
            <Link component={RouterLink} to="/register">
              <img src={user} alt="" width={"30px"} />
            </Link>
          </Typography>
          <Typography>
            <img src={heart} alt="" width={"40px"} />
          </Typography>
          <Typography>
            <Badge badgeContent={quantityCart} color="secondary">
              <Link component={RouterLink} to="/cars">
                <img src={cartt} alt="" width={"40px"} />
              </Link>
            </Badge>
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        sx={{ borderTop: "1px solid #ced4da" }}
      >
        <Stack sx={{ width: "30px" }}>
          <img src={danhmuc} alt="Options lines" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              sx={{ color: "inherit", "&:hover": { textDecoration: "none" } }}
            >
              Home
            </Link>
          </Typography>
          <Typography>
            <Link
              component={RouterLink}
              to="/category"
              underline="none"
              sx={{ color: "inherit", "&:hover": { textDecoration: "none" } }}
            >
              Category
            </Link>
          </Typography>
          <Typography>
            <Link
              component={RouterLink}
              to="/products"
              underline="none"
              sx={{ color: "inherit", "&:hover": { textDecoration: "none" } }}
            >
              Products
            </Link>
          </Typography>
          <Typography>
            <Link
              component={RouterLink}
              to="/pages"
              underline="none"
              sx={{ color: "inherit", "&:hover": { textDecoration: "none" } }}
            >
              Pages
            </Link>
          </Typography>
          <Typography>
            <Link
              component={RouterLink}
              to="/blog"
              underline="none"
              sx={{ color: "inherit", "&:hover": { textDecoration: "none" } }}
            >
              Blog
            </Link>
          </Typography>
          <Typography>
            <Link
              component={RouterLink}
              to="/elements"
              underline="none"
              sx={{ color: "inherit", "&:hover": { textDecoration: "none" } }}
            >
              Elements
            </Link>
          </Typography>
        </Stack>
        <Typography>+123(456)(7890)</Typography>
      </Stack>
    </Stack>
  );
};

export default Header;
