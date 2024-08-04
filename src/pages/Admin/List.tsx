import React, { useEffect, useState } from "react";
import { Product, Search } from "../../types/Product";
import instance from "../../apis";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import Flash from "../../components/Flash";
import { useLoading } from "../../components/contexts/loading";
import { useForm } from "react-hook-form";

const List = () => {
  const { setLoading } = useLoading();
  const [flash, setFlash] = useState({
    isShow: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/products`);
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

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };
  const handleDelete = async () => {
    try {
      await instance.delete(`/products/` + idDelete);
      getAllProduct();
      setFlash({
        isShow: true,
        message: "This is a success Alert.",
        severity: "success",
      });
    } catch (error) {
      setFlash({
        isShow: true,
        message: "This is an error Alert.",
        severity: "error",
      });
    }
  };
  const { register, handleSubmit } = useForm([]);

  const onSearch = (data) => {
    const prods = products.filter((item) => {
      return item.title.toLowerCase().includes(data.pro_name.toLowerCase());
    });

    setProducts(prods);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 10, marginLeft: 35 }}>
        <form onSubmit={handleSubmit(onSearch)}>
          <div>
            <label htmlFor="">Search</label>
            <input type="text" {...register("pro_name")} />
          </div>

          <button type="submit">Submit</button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Desc</TableCell>
              <TableCell align="right">images</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.title}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">
                  <img src={product.thumbnail} alt="" width={"50%"} />
                </TableCell>
                {/* <TableCell align="right">{product.category.name}</TableCell> */}
                <TableCell align="right">
                  <Stack direction={"row"} gap={3} justifyContent={"center"}>
                    <Link to={`/admin/edit/${product._id}`}>
                      {" "}
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "blue" }}
                        onClick={() => handleConfirm(product._id)}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "red" }}
                      onClick={() => handleConfirm(product._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ConfirmDialog
          confirm={confirm}
          onConfirm={setConfirm}
          onDelete={handleDelete}
        />
        <Flash
          isShow={flash.isShow}
          message={flash.message}
          severity={flash.severity}
          onClose={() => setFlash({ ...flash, isShow: false })}
        />
      </TableContainer>
    </>
  );
};

export default List;
