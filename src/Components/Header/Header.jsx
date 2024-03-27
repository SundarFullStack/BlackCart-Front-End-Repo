import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import Logo from "../Images/Logo.png";
import { RiLogoutBoxFill } from "react-icons/ri";
import { RiLoginBoxFill } from "react-icons/ri";
import { BiSolidCart } from "react-icons/bi";
import { TbShoppingCartDollar } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import Login from "../../Pages/Authentication/Login";
import SignUp from "../../Pages/Authentication/SignUp";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { LoginContext } from "../Context/ContextProvider";

// Header Component

const Header = () => {
  // State for  dropdown
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { loginData, setLoginData } = useContext(LoginContext);

  // State for List out products

  const { ProductList, setProductList } = useContext(LoginContext);

  // Navigator

  const navigator = useNavigate();

  // Function for handling dropdown visibility

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  //Sign Up popup open,close operation

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
    setIsOpenDropdown(isOpenDropdown);
  };

  // FOR CLOSE POPUP OPERATION

  const closePopup = () => {
    setPopupOpen(false);
  };

  //Login popup open,close operations

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
    setIsOpenDropdown(isOpenDropdown);
  };

  // FOR CLOSE POPUP OPERATION

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  // Function for handling logout operation

  const handleLogoutFunc = async (e) => {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("UserInfo");
      if (token) {
        localStorage.removeItem("UserInfo");
        setLoginData(null);
        navigator("/");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Function for handling Order Navigator

  const OrderNavigator = () => {
    navigator("/Order");
  };
  // Function for handling Cart Navigator

  const CartNavigator = () => {
    navigator("/Cart");
  };

  // Function for handling Home Navigator

  const HomeNavigator = () => {
    navigator("/Home");
  };

  return (
    <div>
      <div className="navbar-container custom-center">
        {/* Navbar Logo */}
        <div className="nav-logo-container col-lg-2 col-md-4  custom-left">
          <div className="header-logo custom-left">
            <img src={Logo} className="logo-img" />
            <span className="logo-content">BlackCart</span>
          </div>
        </div>
        {/* Search Bar  */}
        <div className="col-lg-6 col-md-4 col-sm-4 col-xs-4 search-cont custom-center">
          <DropdownFilter data={ProductList} />
        </div>
        {/* Menu Dropdown */}
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 login-cont custom-center">
          <div className="dropdown" onClick={toggleDropdown}>
            <button className="dropdown-toggle">Menu</button>
            {isOpenDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={openLoginPopup}>
                    <RiLoginBoxFill className="cart-icon" />
                    Login
                  </li>
                  <li onClick={openPopup}>
                    <SiGnuprivacyguard className="cart-icon" />
                    Sign Up
                  </li>
                  <li onClick={HomeNavigator}>
                    <FaHome className="cart-icon" />
                    Home
                  </li>
                  <li onClick={OrderNavigator}>
                    <TbShoppingCartDollar className="cart-icon" />
                    Orders
                  </li>
                  <li onClick={CartNavigator}>
                    <BiSolidCart className="cart-icon" />
                    Cart
                  </li>
                </ul>
              </div>
            )}
            <Login isOpen={isLoginPopupOpen} onRequestClose={closeLoginPopup} />
            <SignUp isOpen={isPopupOpen} onRequestClose={closePopup} />
          </div>
        </div>

        {/* Logout Btn */}
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 logout-cont custom-center">
          <div className="header-logout-btn-cover pointer  custom-left">
            <Link className="header-logout-btn">
              <RiLogoutBoxFill onClick={handleLogoutFunc} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
