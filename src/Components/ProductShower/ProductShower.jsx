import React, { useContext } from "react";
import "./productShower.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ShoeImage from "../Images/shoeImage.png";
import { FaCartPlus } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import axios from "axios";
import API_URL from "../../../Config/GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../Context/ContextProvider";

// Child Component for Home page

const ProductShower = ({ data, Category }) => {
  const { userId, setUserId } = useContext(LoginContext);

  // Carousel responsiveness
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 2,
    },
  };
  // console.log(data)

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
        toast("Product added to cart successfully");
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for handling place order

  const handleOrderBtnClick = async (OrderItem) => {
    try {
      const res = await axios.post(`${API_URL}/Order/insertOrderProduct`, {
        UserId: userId,
        productName: OrderItem.productName,
        ImgUrl: OrderItem.ImgUrl,
        productPrice: OrderItem.productPrice,
        oldPrice: OrderItem.oldPrice,
        productDefn: OrderItem.productDefn,
        productSeller: OrderItem.productSeller,
        category: OrderItem.category,
        OrderQty: 1,
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
      <div className="home-card-container-cover">
        <div className="home-card-container">
          {/* Product Category */}
          <div className="row">
            <p className="home-card-header">{Category}</p>
          </div>
          {/* Carousel Container */}
          <div className="row row-carousel">
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {/* Product list array mapping */}
              {data.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-2 home-product-list-container"
                  key={index + 1}
                >
                  {/* Image */}
                  <div className="home-img-cover home-custom-center pointer">
                    <img
                      src={item.ImgUrl}
                      className="home-prod_img custom-center"
                      alt="image"
                    />
                  </div>
                  {/* product name */}
                  <p className="home-prodName custom-center">
                    {item.productName}
                  </p>
                  {/* product price */}
                  <p className="home-prodPrice custom-center">
                    From ₹ {item.productPrice}
                  </p>
                  {/* Product Company */}
                  <p className="home-prodCompany custom-center">
                    {item.productCompany}
                  </p>
                  <div className="home-product-card-btn-cover ">
                    {/* dd to cart button */}
                    <button
                      className="home-product-card-cart-btn custom-center"
                      onClick={() => handleCartBtnClick(item)}
                    >
                      <FaCartPlus />
                      <span style={{ marginLeft: "8px" }}>Add To Cart</span>
                    </button>
                    {/* Place order button */}
                    <button
                      className="home-product-card-order-btn custom-center"
                      onClick={() => handleOrderBtnClick(item)}
                    >
                      <FaBoltLightning />
                      <span style={{ marginLeft: "8px" }}>Buy Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShower;
