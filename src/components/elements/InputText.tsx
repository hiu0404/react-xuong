import { TextField } from "@mui/material";
import React from "react";

type InputTextProps = {
  lable: string;
  input: any;
  messageError: string;
  type?: "text" | "number" | "password";
};

const InputText = ({
  input,
  messageError,
  lable,
  type = "text",
}: InputTextProps) => {
  return (
    <TextField
      error={!!messageError}
      label={lable}
      variant="standard"
      helperText={messageError}
      type={type}
      {...input}
      sx={{ width: "400px" }}
    ></TextField>
  );
};

export default InputText;
