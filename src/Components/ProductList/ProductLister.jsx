import React from "react";
import "./productList.css";
import ShoeImage from "../Images/shoeImage.png";

// Child Component for Layout

const ProductLister = ({ prodList }) => {
  // console.log("prodList", prodList);
  return (
    <>
      {prodList.map((data, index) => (
        <div
          className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-5 product-list-cover"
          key={index + 1}
        >
          {/* Image */}
          <div className="img-cover custom-center">
            <img
              src={data.ImgUrl}
              className="prod_img custom-center"
              alt={data.productName}
            />
          </div>
          {/* Product Details */}
          <p className="prodName custom-center">{data.productName}</p>
          <p className="prodPrice custom-center">From ₹ {data.productPrice}</p>
          <p className="prodCompany custom-center">{data.productSeller}</p>
        </div>
      ))}
    </>
  );
};

export default ProductLister;
