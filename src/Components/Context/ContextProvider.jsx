import React, { createContext, useState, useContext } from "react";

// CREATE CONTEXT USING CREATECONTEXT KEYWORD WITH LOGIN CONTEXT VARIABLE

export const LoginContext = createContext({
  loginData: [],
  setLoginData: () => Promise,
  userId: [],
  setUserId: () => Promise,
  ProductList: [],
  setProductList: () => Promise,
  CartList: [],
  setCartList: () => Promise,
  OrderList: [],
  setOrderList: () => Promise,
  ProductDetail: [],
  setProductDetail: () => Promise,
});

// EXPORTING CONTEXT WITH USE CONTEXT KEYWORD
export const useMyContext = () => useContext(LoginContext);

const Context = ({ children }) => {
  let [loginData, setLoginData] = useState(null);
  let [userId, setUserId] = useState(null);
  let [ProductList, setProductList] = useState([]);
  let [CartList, setCartList] = useState([]);
  let [OrderList, setOrderList] = useState([]);
  let [ProductDetail, setProductDetail] = useState({});

  let value = {
    loginData,
    setLoginData,
    userId,
    setUserId,
    ProductList,
    setProductList,
    CartList,
    setCartList,
    OrderList,
    setOrderList,
    ProductDetail,
    setProductDetail,
  };
  return (
    <>
      <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    </>
  );
};

export default Context;
