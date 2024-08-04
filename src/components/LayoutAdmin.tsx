import { Outlet, useNavigate } from "react-router-dom";
import { useLoading } from "./contexts/loading";
import Loading from "./Loading";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

const LayoutAdmin = () => {
  const { loading } = useLoading();
  console.log(loading);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);
  return (
    <>
      <Loading isShow={loading} />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default LayoutAdmin;
