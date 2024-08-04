import { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Field, Form } from "react-final-form";
import InputText from "../components/elements/InputText";
import { ValidationErrors } from "final-form";
import isEmail from "validator/lib/isEmail";
import { Link, useNavigate } from "react-router-dom";
import Flash from "../components/Flash";
import instance from "../apis";

type LoginFormParams = {
  email: string;
  password: string;
};

const MIN_PASSWORD = 6;

const Login = () => {
  const [flash, setFlash] = useState({
    isShow: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const navigate = useNavigate();

  const validate = (values: LoginFormParams) => {
    const { email, password } = values;
    const errors: ValidationErrors = {};
    if (!email) errors.email = "Cần nhập email";
    if (email && !isEmail(email)) errors.email = "Email chưa đúng định dạng";
    if (!password) errors.password = "Cần nhập password";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Password cần tối thiểu ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (values: LoginFormParams) => {
    try {
      const { data } = await instance.post("/auth/login", values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setFlash({
        isShow: true,
        message: "Bạn đã đăng nhập thành công.",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setFlash({
        isShow: true,
        message: "Đăng nhập thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  return (
    <Container>
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
          Login
        </Typography>
        <Typography
          marginRight={"20px"}
          sx={{ fontSize: "17px", fontWeight: "600" }}
        >
          <Link to={"/"}>Home</Link> - Login
        </Typography>
      </Stack>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack
              gap={2}
              sx={{ border: "1px solid #e9e9e9" }}
              borderRadius={"5px"}
              padding={"30px"}
              maxWidth={"600px"}
              margin={"auto"}
              alignItems={"center"}
            >
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    lable="Email"
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    lable="Password"
                    messageError={meta.touched && meta.error}
                    type="password"
                  />
                )}
              />
              <Stack>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#64b496",
                    width: "100px",
                    height: "40px",
                    fontWeight: "600",
                    color: "#fff",
                    border: "1px solid #64b496",
                    fontSize: "14px",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      />
      <Flash
        isShow={flash.isShow}
        message={flash.message}
        severity={flash.severity}
        onClose={() => setFlash({ ...flash, isShow: false })}
      />
    </Container>
  );
};

export default Login;
