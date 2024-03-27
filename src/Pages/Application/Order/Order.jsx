import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import { SiPowerpages } from "react-icons/si";
import CircularProgress from "@mui/material/CircularProgress";
import ShoeImage from "../../../Components/Images/shoeImage.png";
import { FaSearchDollar } from "react-icons/fa";
import OrderLister from "../../../Components/OrderList/OrderLister";
import axios from "axios";
import API_URL from "../../../../Config/GlobalUrl";

// Order Component

const Order = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  // State for store ordered products
  const { OrderList, setOrderList } = useContext(LoginContext);
  const { userId, setUserId } = useContext(LoginContext);

  // Function for handling fetch ordered products

  const getOrderList = async () => {
    try {
      const res = await axios.get(`${API_URL}/Order/getOrderProduct/${userId}`);

      if (res.data.List) {
        setOrderList(res.data.List);
      } else {
        alert("orders not found");
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for handling filter operation

  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filterData = (item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    );
  };

  const filteredData = OrderList.filter(filterData);

  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <>
      {loginData ? (
        <>
        {/* Page Name */}
        <div className="Cart-Name">
          <SiPowerpages/> <span style={{marginLeft:"5px"}}>Orders</span>
          </div>
          <div className="order-container-cover">
            <div className="order-container">
              {/* Order Search bar */}
              <div className="row order-search-bar-row custom-center">
                <div className="col-lg-6 col-md-10 col-sm-8 col-xs-8 search-cont custom-center">
                  <div className="order-search-bar-cover">
                    <form>
                      <div className="form-control order-search-form-control">
                        <input
                          type="text"
                          className="order-search-input-style"
                          placeholder="Search for orders..."
                          onChange={handleFilterChange}
                          value={searchText}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Ordered Items List */}
              <OrderLister data={filteredData} getOrderList={getOrderList} />
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

export default Order;
