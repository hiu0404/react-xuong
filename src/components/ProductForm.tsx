import { useForm } from "react-hook-form";

import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductInputs } from "../types/Product";
type ProductFormProps = {
  product?: Product;
  onSubmit: (value: ProductInputs) => void;
};
const schema = z.object({});
const ProductForm = ({ onSubmit, product }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!product) return;
    reset(product);
  }, [product]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="lable" htmlFor="">
        Title
      </label>
      <input
        className="form-control"
        type="text"
        id="title"
        {...(register("title"), { required: false })}
      />
      {errors?.title && <p className="text-danger">{errors.title.message}</p>}
      <label className="lable" htmlFor="">
        Price
      </label>
      <input
        className="form-control"
        type="text"
        id="price"
        {...(register("price"), { required: false })}
      />
      {errors?.price && <p className="text-danger">{errors.price.message}</p>}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
