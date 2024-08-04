import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Field, Form } from "react-final-form";
import { Product } from "../../types/Product";
import instance from "../../apis";
import { ValidationErrors } from "final-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "../../components/contexts/loading";
import Flash from "../../components/Flash";
const Edit = () => {
  const [flash, setFlash] = useState({
    isShow: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const getProduct = async (id: string) => {
    try {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const onSubmit = async (values: Product) => {
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFlash({
        isShow: true,
        message: "Thêm thất bại. Vui lòng điền đầy đủ thông tin.",
        severity: "error",
      });
      return;
    }
    try {
      setLoading(true);
      await instance.put(`/products/${id}`, values);
      setFlash({
        isShow: true,
        message: "This is a success Alert.",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/admin/list");
      }, 2000);
    } catch (error) {
      alert("Thêm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const validate = (values: Product) => {
    const { title, thumbnail, description, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Cần nhập title vào";
    if (!thumbnail) errors.thumbnail = "Cần nhập thumbnail vào";
    if (!description) errors.description = "Cần nhập description vào";
    if (!price) errors.price = "Cần nhập price vào";
    return errors;
  };
  return (
    <Container sx={{ marginTop: 10, marginLeft: 35 }}>
      <Stack gap={2}>
        <Typography>Edit Product</Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={product}
          render={({ handleSubmit, values }) => {
            return (
              <Stack>
                <Field<string>
                  name="title"
                  render={({ input, meta }) => {
                    return (
                      <TextField
                        error={!!(meta.touched && meta.error)}
                        label="Title"
                        variant="standard"
                        helperText={meta.touched && meta.error}
                        {...input}
                        sx={{ width: "400px" }}
                      />
                    );
                  }}
                />
                <Field<number>
                  name="price"
                  render={({ input, meta }) => {
                    return (
                      <TextField
                        error={!!(meta.touched && meta.error)}
                        label="Price"
                        variant="standard"
                        type="number"
                        helperText={meta.touched && meta.error}
                        {...input}
                        sx={{ width: "400px" }}
                      />
                    );
                  }}
                />

                <Field<string>
                  name="description"
                  render={({ input, meta }) => {
                    return (
                      <TextField
                        error={!!(meta.touched && meta.error)}
                        label="Description"
                        variant="standard"
                        helperText={meta.touched && meta.error}
                        {...input}
                        sx={{ width: "400px" }}
                      />
                    );
                  }}
                />
                <Field<string>
                  name="thumbnail"
                  render={({ input, meta }) => {
                    return (
                      <TextField
                        error={!!(meta.touched && meta.error)}
                        label="Thumbnail"
                        variant="standard"
                        helperText={meta.touched && meta.error}
                        {...input}
                        sx={{ width: "400px" }}
                      />
                    );
                  }}
                />
                <Field<string>
                  name="isShow"
                  type="checkbox"
                  render={({ input, meta }) => {
                    return (
                      <FormControlLabel
                        control={<Checkbox {...input} />}
                        label="Show Product"
                      />
                    );
                  }}
                />
                <Button
                  sx={{ width: "400px" }}
                  type="submit"
                  onClick={() => onSubmit(values)}
                >
                  Submit
                </Button>
              </Stack>
            );
          }}
        />
      </Stack>
      <Flash
        isShow={flash.isShow}
        message={flash.message}
        severity={flash.severity}
        onClose={() => setFlash({ ...flash, isShow: false })}
      />
    </Container>
  );
};

export default Edit;
