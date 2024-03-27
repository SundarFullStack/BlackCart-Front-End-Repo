import { useState, useContext, useEffect } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import FPUpdate from "./Pages/Authentication/FPUpdate";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import SignUp from "./Pages/Authentication/SignUp";
import Header from "./Components/Header/Header";
import ProductDetail from "./Components/ProductDetails/ProductDetail";
import Order from "./Pages/Application/Order/Order";
import Cart from "./Pages/Application/Cart/Cart";
import Home from "./Pages/Application/Home/Home";
import API_URL from "../Config/GlobalUrl";
import axios from "axios";
import { LoginContext } from "./Components/Context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [data, setData] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  const { userId, setUserId } = useContext(LoginContext);
  const { ProductList, setProductList } = useContext(LoginContext);
  const navigator = useNavigate();
  // console.log("CartList", CartList);
  // console.log("OrderList", OrderList);
  // console.log("userID",userId);

  // Function for handling user validation

  const DashboardValid = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("UserInfo"));

      // console.log("UserFront", user);
      if (user) {
        const headers = {
          Authorization: user,
          "Content-Type": "application/json",
        };

        let response = await axios.get(`${API_URL}/validUser`, { headers });

        if (response.status == 200) {
          setLoginData(response.data.UserData.name);
          setUserId(response.data.UserData._id);
        } else if (response.status == 201) {
          navigator("/");
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for  fetch products

  const getProductList = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/getProduct`);

      // console.log("res", res.data.List);

      setProductList(res.data.List);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  useEffect(() => {
    DashboardValid();
    getProductList();
    setData(true);
  }, [loginData]);
  return (
    <>
      {data ? (
        <>
          {/* Header component  */}
          <Header />
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/FPUpdate/:token" element={<FPUpdate />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/ProductDetail" element={<ProductDetail />} />
          </Routes>
        </>
      ) : (
        <>
          <div className="custom-center load-icon-cover">
            <CircularProgress style={{ color: "gray" }} />
            <span style={{ marginLeft: "15px", fontWeight: "600" }}>
              Loading...
            </span>
            {/* {console.log("Invalid User")} */}
          </div>
        </>
      )}
    </>
  );
}

export default App;
