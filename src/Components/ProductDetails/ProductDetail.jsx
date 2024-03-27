import React, { useState, useContext } from "react";
import "./productDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { SiPowerpages } from "react-icons/si";
import axios from "axios";
import API_URL from "../../../Config/GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { LoginContext } from "../Context/ContextProvider";

// Child component for header dropdown filter show product details

const ProductDetail = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const { userId, setUserId } = useContext(LoginContext);
  // State for store clicked object from dropdown filter
  const { ProductDetail, setProductDetail } = useContext(LoginContext);
  const navigator = useNavigate();

  // Function for handling add to cart operation

  const handleCartBtnClick = async (CartItem) => {
    try {
      const res = await axios.post(`${API_URL}/Cart/insertCartProduct`, {
        UserId: userId,
        productName: CartItem.productName,
        ImgUrl: CartItem.ImgUrl,
        productPrice: CartItem.productPrice,
        oldPrice: CartItem.oldPrice,
        productDefn: CartItem.productDefn,
        productSeller: CartItem.productSeller,
        category: CartItem.category,
        OrderQty: 1,
      });
      // console.log("res", res);
      if (res.data.savedData) {
        await toast("Product added to cart successfully");
        await navigator("/Home");
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for handling place order

  // const handlePlaceOrderFunc = async (item) => {
  //   try {
  //     // console.log(item)
  //     // console.log(qty)

  //     const res = await axios.post(`${API_URL}/Order/insertOrderProduct`, {
  //       productName: item.productName,
  //       ImgUrl: item.ImgUrl,
  //       productPrice: item.productPrice,
  //       oldPrice: item.oldPrice,
  //       productDefn: item.productDefn,
  //       productSeller: item.productSeller,
  //       category: item.category,
  //       OrderQty: item.OrderQty,
  //     });
  //     if (res.status == 200) {
  //       toast("Order  placed  successfully");
  //     }
  //   } catch (error) {
  //     console.log("Error Occurred:", error);
  //   }
  // };

  return (
    <>
      {loginData ? (
        <>
           {/* Page Name */}
           <div className="Cart-Name">
          <SiPowerpages/> <span style={{marginLeft:"5px"}}>Product Specification</span>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="dark"
            transition:Bounce
          />

          <div className="PD-cart-item-border-cover">
            <div className="row cart-content-cover">
              {/* Image */}
              <div className="col-lg-3 col-md- cart-content-image-cover  custom-center">
                <img src={ProductDetail.ImgUrl} className="prod_img" />
              </div>
              {/* Product Name & Product Seller & Product Old Price */}
              <div className="col-lg-6 ">
                <div className="cart-item-content-cover">
                  <p style={{ fontWeight: "bold" }} className="custom-center">
                    {ProductDetail.productName}
                  </p>
                  <p style={{ color: "gray" }} className="custom-center">
                    Seller:{ProductDetail.productSeller}
                  </p>
                  <p style={{ fontSize: "15px" }} className="custom-center">
                    <del style={{ color: "gray" }} className="custom-center">
                      ₹{ProductDetail.oldPrice}
                    </del>
                    <span style={{ margin: "10px" }} className="custom-center">
                      ₹{ProductDetail.productPrice}
                    </span>
                    <span style={{ color: "green" }} className="custom-center">
                      {" "}
                      Off2 offers applied
                    </span>
                  </p>
                </div>
              </div>
              {/* Delivery Date */}
              <div className="col-lg-3 custom-center">
                <p>Delivery by Thu Mar 28</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-xs-12 col-sm-12"></div>
              <div className="col-lg-8 col-sm-12 col-xs-12">
                {/* Add to cart button */}
                <div className="cart-item-btn-cover">
                  <span
                    className="cart-item-place-order-btn pointer"
                    onClick={() => handleCartBtnClick(ProductDetail)}
                  >
                    <FaCartPlus style={{ marginRight: "5px" }} /> Add To Cart
                  </span>
                  {/* <span
                      className="cart-item-place-order-btn pointer"
                      onClick={() => handlePlaceOrderFunc(ProductDetail)}
                    >
                      <BsFillLightningFill style={{ marginRight: "5px" }} />{" "}
                      Place Order
                    </span> */}
                </div>
                <p></p>
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
            {/* {console.log("Invalid User")} */}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
