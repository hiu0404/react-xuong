import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-around"}
      sx={{ backgroundColor: "#e9e9e9", color: "#7A7A7A" }}
      marginTop="100px"
    >
      <Stack>
        <Typography variant="h5">Carrot</Typography>
        <Typography variant="body2">
          Carrot is the biggest market of grocery products. Get your daily needs
          from our store.
        </Typography>
        <Typography variant="body2">
          51 Green St.Huntington ohaio beach ontario, NY 11746 KY 4783, USA.
        </Typography>
        <Typography variant="body2">example@email.com</Typography>
        <Typography variant="body2">+91 123 4567890</Typography>
      </Stack>
      <Stack>
        <Typography variant="h5">Company</Typography>
        <Typography variant="body2">About Us</Typography>
        <Typography variant="body2">Delivery Information</Typography>
        <Typography variant="body2">Privacy Policy</Typography>
        <Typography variant="body2">Terms & Conditions</Typography>
      </Stack>
      <Stack>
        <Typography variant="h5">Category</Typography>
        <Typography variant="body2">Dairy & Bakery</Typography>
        <Typography variant="body2">Fruits & Vegetable</Typography>
        <Typography variant="body2">Snack & Spice</Typography>
        <Typography variant="body2">Juice & Drinks</Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
