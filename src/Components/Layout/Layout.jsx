import React, { useEffect, useContext, useState } from "react";
import "./layout.css";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import ProductLister from "../ProductList/ProductLister";
import shoeImage from "../Images/shoeImage.png";
import { LoginContext } from "../Context/ContextProvider";

// Component for building dashboard layout
const Layout = () => {
  const { ProductList, setProductList } = useContext(LoginContext);
  // console.log(ProductList)
  return (
    <>
      <Content />
      <div className="custom-center">
        <div className="product-list-container">
          <div className="row">
            <div className="product-list-header">
              <h3 className=" custom-center">Best shop for sports things</h3>
              <hr />
            </div>
          </div>
          {/* Calling Component for listing products randomly */}
          <div className="row">
            <ProductLister prodList={ProductList} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
