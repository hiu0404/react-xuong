import { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Field, Form } from "react-final-form";
import InputText from "../components/elements/InputText";
import { ValidationErrors } from "final-form";
import isEmail from "validator/lib/isEmail";
import { Link, useNavigate } from "react-router-dom";
import Flash from "../components/Flash";
import instance from "../apis";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
};

const MIN_PASSWORD = 6;

const Register = () => {
  const [flash, setFlash] = useState({
    isShow: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const navigate = useNavigate();

  const validate = (values: RegisterFormParams) => {
    const { username, email, password } = values;
    const errors: ValidationErrors = {};
    if (!username) errors.username = "Cần nhập username";
    if (!email) errors.email = "Cần nhập email";
    if (email && !isEmail(email)) errors.email = "Email chưa đúng định dạng";
    if (!password) errors.password = "Cần nhập password";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Password cần tối thiểu ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (values: RegisterFormParams) => {
    try {
      await instance.post("/auth/register", values);
      setFlash({
        isShow: true,
        message: "Bạn đã đăng ký thành công.",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      setFlash({
        isShow: true,
        message: "Đăng ký thất bại. Vui lòng thử lại.",
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
          Register
        </Typography>
        <Typography
          marginRight={"20px"}
          sx={{ fontSize: "17px", fontWeight: "600" }}
        >
          <Link to={"/"}>Home</Link> - Register
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
                name="username"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    lable={"Username"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    lable={"Email"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    lable={"Password"}
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
              <Typography>
                <Link to={"/login"}>Bạn đã có tài khoản</Link>
              </Typography>
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

export default Register;
