import { useEffect, useState } from "react";
import instance from "../apis";

import { useNavigate, useParams } from "react-router-dom";
import { Product, ProductInputs } from "../types/Product";

const useProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | undefined>();
  const getProduct = async () => {
    try {
      const { data } = await instance.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  const getDetailProduct = async () => {
    try {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getDetailProduct();
  }, [id]);
  const handleAddProduct = async (data: ProductInputs) => {
    try {
      await instance.post("/products", data);
      navigate("/");
      alert("Ok");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = async (data: ProductInputs) => {
    try {
      await instance.put(`/products/${id}`, data);
      navigate("/");
      alert("Ok");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Bạn có muốn xóa không")) {
      try {
        await instance.delete(`/products/${id}`);
        getProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return {
    products,
    product,
    getProduct,
    getDetailProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
  };
};

export default useProduct;
