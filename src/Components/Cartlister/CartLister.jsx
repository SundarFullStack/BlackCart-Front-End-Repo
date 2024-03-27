import React, { useState, useContext } from "react";
import "./cartLister.css";
import ShoeImage from "../Images/shoeImage.png";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsFillLightningFill } from "react-icons/bs";
import axios from "axios";
import API_URL from "../../../Config/GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../Context/ContextProvider.jsx";

// Child Component for Cart 

const CartLister = ({ data, getCartFunc, onIncrease, onDecrease }) => {
  const { userId, setUserId } = useContext(LoginContext);
  // console.log("qtyVal",qtyVal)

  // Function for removing product from cart

  const handleCartRemoveFunc = async (ItemId) => {
    try {
      // console.log(ItemId);
      const res = await axios.delete(
        `${API_URL}/Cart/deleteCartProduct/${ItemId}/${userId}`
      );

      // console.log("res", res.status);

      if (res.status == 200) {
        toast("Product removed from cart successfully");
        getCartFunc();
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for place order

  const handlePlaceOrderFunc = async (item) => {
    try {
      // console.log(item)
      // console.log(qty)

      const res = await axios.post(`${API_URL}/Order/insertOrderProduct`, {
        UserId: userId,
        productName: item.productName,
        ImgUrl: item.ImgUrl,
        productPrice: item.productPrice,
        oldPrice: item.oldPrice,
        productDefn: item.productDefn,
        productSeller: item.productSeller,
        category: item.category,
        OrderQty: item.OrderQty,
      });
      if (res.status == 200) {
        toast("Order  placed  successfully");
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        transition:Bounce
      />
      {data.map((item, index) => (
        <div className="cart-item-border-cover" key={index + 1}>
          <div className="row cart-content-cover">
            {/* Crt Item Image */}
            <div className="col-lg-3 col-md- cart-content-image-cover  custom-center">
              <img src={item.ImgUrl} className="prod_img" />
            </div>
            <div className="col-lg-6 ">
              <div className="cart-item-content-cover">
                {/* Product Name*/}
                <p style={{ fontWeight: "bold" }} className="custom-center">
                  {item.productName}
                </p>
                {/* Product Seller*/}
                <p style={{ color: "gray" }} className="custom-center">
                  Seller:{item.productSeller}
                </p>
                {/* Old Price */}
                <p style={{ fontSize: "15px" }} className="custom-center">
                  <del style={{ color: "gray" }} className="custom-center">
                    ₹{item.oldPrice}
                  </del>
                  {/* Current Price */}
                  <span style={{ margin: "10px" }} className="custom-center">
                    ₹{item.productPrice}
                  </span>
                  <span style={{ color: "green" }} className="custom-center">
                    {" "}
                    Off2 offers applied
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-3 custom-center">
              <p>Delivery by Thu Mar 28</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-xs-12 col-sm-12">
              <div className="cart-item-qty-cover custom-center">
                <p>
                  {/*  Button for decrease value of quantity */}
                  <span
                    className="cart-item-qty-sub pointer"
                    onClick={() => onDecrease(item)}
                  >
                    -
                  </span>
                  <span className="cart-item-qty-val pointer">
                    {item.OrderQty}
                  </span>
                  {/* Button for increase qty value */}
                  <span
                    className="cart-item-qty-add pointer"
                    onClick={() => onIncrease(item)}
                  >
                    +
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12 col-xs-12">
              <div className="cart-item-btn-cover">
                {/* Button for place order */}
                <span
                  className="cart-item-place-order-btn pointer"
                  onClick={() => handlePlaceOrderFunc(item)}
                >
                  <BsFillLightningFill style={{ marginRight: "5px" }} /> Place
                  Order
                </span>
                {/* Button for remove product from cart */}
                <span
                  className="cart-item-place-order-btn pointer"
                  onClick={() => handleCartRemoveFunc(item._id)}
                >
                  <RiDeleteBin5Fill style={{ marginRight: "5px" }} /> Remove
                </span>
              </div>
              <p></p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default CartLister;
