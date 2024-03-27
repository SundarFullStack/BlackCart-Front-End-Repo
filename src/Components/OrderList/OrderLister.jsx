import React, { useContext } from "react";
import "./orderList.css";
import ShoeImage from "../Images/shoeImage.png";
import { PiTrashFill } from "react-icons/pi";
import axios from "axios";
import API_URL from "../../../Config/GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../Context/ContextProvider.jsx";

// Child component for Order

const OrderLister = ({ data, getOrderList }) => {
  const { userId, setUserId } = useContext(LoginContext);

  // Function for handling confirmation based actions

  const handleConfirmation = (ItemId) => {
    const confirmed = window.confirm("Are you sure you want to cancel order?");

    if (confirmed) {
      // console.log("Confirmed!");
      handleCancelOrderFunc(ItemId);
    } else {
      // console.log("Cancelled!");
    }
  };

  // Function for handling place order

  const handleCancelOrderFunc = async (ItemId) => {
    try {
      // console.log("id",ItemId)

      const res = await axios.delete(
        `${API_URL}/Order/deleteOrderProduct/${ItemId}/${userId}`
      );

      // console.log("res",res.status)

      if (res.status == 200) {
        toast("Order cancelled successfully");
        getOrderList();
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  return (
    <div>
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
        <div className="col-lg-12" key={index + 1}>
          <div className="row row-order-content">
            <div className="order-content  pointer">
              {/* Image */}
              <div className="col-lg-3">
                <div className="order-img-cover custom-center">
                  <img src={item.ImgUrl} className="order-img" />
                </div>
              </div>
              {/* order detail */}
              <div className="col-lg-3 order-detail-cover">
                <p className="custom-center">{item.productName}</p>
                <p className="order-item-color custom-center">Color:Black</p>
                <p className="order-item-color custom-center">
                  Quantity:{item.OrderQty}
                </p>
              </div>
              {/* order price */}
              <div className="col-lg-1 custom-center">
                <p style={{ color: "green", fontWeight: "bold" }}>
                  ₹ {item.TotalPrice}
                </p>
              </div>
              {/* order delivery details */}
              <div className="col-lg-4">
                <p className="custom-center">Delivery on Dec 26, 2023</p>
                <p className="order-item-deliver-message custom-center">
                  Your item has been delivered
                </p>
              </div>
              {/* Cancel Order Button*/}
              <div className="col-lg-1 custom-center">
                <span onClick={() => handleConfirmation(item._id)}>
                  <PiTrashFill
                    className="custom-center"
                    style={{ fontSize: "25px", color: "#dc3545" }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderLister;
