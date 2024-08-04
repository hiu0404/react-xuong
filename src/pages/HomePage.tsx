import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import ProductCard from "../ProductsCard";
import Loading from "../components/Loading";
import cake from "../assets/images/Screenshot 2024-07-08 212818.png";
import mike from "../assets/images/Screenshot 2024-07-08 212846.png";
import fresh from "../assets/images/b.png";
import healthy from "../assets/images/v.png";
import avata1 from "../assets/images/1.jpg";
import avata2 from "../assets/images/2.jpg";
import avata3 from "../assets/images/3.jpg";
import instance from "../apis";
import banner from "../assets/images/Screenshot 2024-07-08 162134.png";
function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get("/products");
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <Stack>
        <img width={"100%"} height={"100%"} src={banner} alt="" />
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"30px"}
        marginTop={"50px"}
      >
        <Stack direction={"row"}>
          <Stack spacing={2}>
            <Paper
              elevation={3}
              sx={{ p: 2, bgcolor: "#e9ecef", minWidth: "200px" }}
            >
              <Typography variant="h6">Cake & Milk</Typography>
              <Typography>(65 items)</Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{ p: 2, bgcolor: "#e9ecef", minWidth: "200px" }}
            >
              <Typography variant="h6">Fresh Meat</Typography>
              <Typography>(30 items)</Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{ p: 2, bgcolor: "#e9ecef", minWidth: "200px" }}
            >
              <Typography variant="h6">Vegetables</Typography>
              <Typography>(25 items)</Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{ p: 2, bgcolor: "#e9ecef", minWidth: "200px" }}
            >
              <Typography variant="h6">Apple & Mango</Typography>
              <Typography>(45 items)</Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{ p: 2, bgcolor: "#e9ecef", minWidth: "200px" }}
            >
              <Typography variant="h6">Strawberry</Typography>
              <Typography>(68 items)</Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{ p: 2, bgcolor: "#e9ecef", minWidth: "200px" }}
            >
              <Typography variant="h6">View More</Typography>
              <Typography>(65 items)</Typography>
            </Paper>
          </Stack>
          <Stack>
            <img src={cake} alt="" width={"100%"} height={"100%"} />
          </Stack>
          <Stack>
            <img src={mike} alt="" width={"100%"} height={"100%"} />
          </Stack>
        </Stack>
      </Stack>

      <Loading isShow={loading} />
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3} // 24px
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Stack>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        spacing={5}
        marginTop={"50px"}
      >
        <img src={fresh} alt="" width={"40%"} />
        <img src={healthy} alt="" width={"40%"} />
      </Stack>
      <Box sx={{ textAlign: "center" }} marginTop={"30px"}>
        {" "}
        <Typography variant="h3">Great Words From People</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore lacus vel facilisis.
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center" marginTop={"10px"}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              textAlign: "center",
            }}
            elevation={0}
          >
            <Avatar sx={{ width: 100, height: 100, margin: "auto" }}>
              <img src={avata1} alt="Avatar 1" />
            </Avatar>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Co Founder
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 1 }}>
              Stephen Smith
            </Typography>
            <Typography variant="body2">
              "eiusmpsu dolor sit amet, conse cte tur ng elit, sed do eiusmod
              tem lacus vel facilisis"
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              textAlign: "center",
            }}
            elevation={0}
          >
            <Avatar sx={{ width: 100, height: 100, margin: "auto" }}>
              <img src={avata2} alt="Avatar 2" />
            </Avatar>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Co Founder
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 1 }}>
              Stephen Smith
            </Typography>
            <Typography variant="body2">
              "eiusmpsu dolor sit amet, conse cte tur ng elit, sed do eiusmod
              tem lacus vel facilisis"
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              textAlign: "center",
            }}
            elevation={0}
          >
            <Avatar sx={{ width: 100, height: 100, margin: "auto" }}>
              <img src={avata3} alt="Avatar 3" />
            </Avatar>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Co Founder
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 1 }}>
              Stephen Smith
            </Typography>
            <Typography variant="body2">
              "eiusmpsu dolor sit amet, conse cte tur ng elit, sed do eiusmod
              tem lacus vel facilisis"
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
