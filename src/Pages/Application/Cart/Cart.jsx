import React, { useState, useContext, useEffect } from "react";
import "./cart.css";
import { SiPowerpages } from "react-icons/si";
import CartLister from "../../../Components/Cartlister/CartLister";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import API_URL from "../../../../Config/GlobalUrl";

// Cart Component

const Cart = () => {
  // Array for store user name
  const { loginData, setLoginData } = useContext(LoginContext);
  // Array for store cart products
  const { CartList, setCartList } = useContext(LoginContext);
  // Array for store user Id
  const { userId, setUserId } = useContext(LoginContext);
  // console.log(CartList.length);

  // Function to increase quantity

  const handleIncrease = async (item) => {
    const updatedCart = await CartList.map((cartItem, index) => {
      if (cartItem._id == item._id) {
        return { ...cartItem, OrderQty: cartItem.OrderQty + 1 };
      }
      return cartItem;
      console.log(cartItem);
    });
    setCartList(updatedCart);
  };
  // Function to decrease quantity

  const handleDecrease = async (item) => {
    const updatedCart = await CartList.map((cartItem, index) => {
      if (cartItem._id == item._id && cartItem.OrderQty > 1) {
        return { ...cartItem, OrderQty: cartItem.OrderQty - 1 };
      }
      return cartItem;
      console.log(cartItem);
    });
    setCartList(updatedCart);
  };

  // Function for handling fetch cart products data

  const getCartList = async () => {
    try {
      const res = await axios.get(`${API_URL}/Cart/getCartProduct/${userId}`);

      // console.log("res", res.data.List);

      if (res.data.List) {
        setCartList(res.data.List);
      } else {
        alert("Cart is empty");
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  useEffect(() => {
    getCartList();
  }, []);
  return (
    <>
      {loginData ? (
        <>
        {/* Page Name */}
          <div className="Cart-Name">
          <SiPowerpages/> <span style={{marginLeft:"5px"}}>Cart</span>
          </div>
          <div className="cart-container">
            <div className="row" style={{ margin: "10px" }}>
              {/* Calling child component for list out cart products */}
              <div className="col-lg-12">
                <div className="row cart-list-container">
                  <CartLister
                    data={CartList}
                    getCartFunc={getCartList}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="custom-center load-icon-cover">
            <CircularProgress style={{ color: "gray" }} />
            <span style={{ marginLeft: "15px", fontWeight: "600" }}>
              Invalid User, Please Login
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
