import React, { useState, useContext, useEffect } from "react";
import "./home.css";
import Content from "../../../Components/Content/Content";
import ProuductShower from "../../../Components/ProductShower/ProductShower";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import API_URL from "../../../../Config/GlobalUrl";

const Home = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const { userId, setUserId } = useContext(LoginContext);
  const { ProductList, setProductList } = useContext(LoginContext);
  const [sportsSneakers, setSportsSneakers] = useState([]);
  const [sportsWears, setSportsWears] = useState([]);
  const [gymSupplies, setGymSupplies] = useState([]);
  const [category, setCategory] = useState([
    "Sports Sneakers",
    "Sports Wears",
    "Gym Supplies",
  ]);

  // console.log("sportsSneakers",sportsSneakers);
  // console.log("sportsWears",sportsWears);
  // console.log("gymSupplies",gymSupplies);

  // Function for handling filter items into different categories

  const filterItemsIntoCategories = async () => {
    try {
      const categoryA = ProductList.filter(
        (item) => item.category === "Sports Sneakers"
      );
      const categoryB = ProductList.filter(
        (item) => item.category === "Sports Wears"
      );
      const categoryC = ProductList.filter(
        (item) => item.category === "Gym Supplies"
      );

      setSportsSneakers(categoryA);
      setSportsWears(categoryB);
      setGymSupplies(categoryC);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  //Function for handling fetch products

  const getProductList = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/getProduct`);

      // console.log("res", res.data.List);

      setProductList(res.data.List);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

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

  useEffect(() => {
    DashboardValid();
    getProductList();
    filterItemsIntoCategories();
  }, [ProductList]);

  // console.log("ProductList",ProductList)
  return (
    <>
      {loginData ? (
        <>
          {/* Main Content  */}
          <Content />
          {/* Clling child components for list out products in various categories */}
          <ProuductShower data={sportsSneakers} Category={category[0]} />
          <ProuductShower data={sportsWears} Category={category[1]} />
          <ProuductShower data={gymSupplies} Category={category[2]} />
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

export default Home;
