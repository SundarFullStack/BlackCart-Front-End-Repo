import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Login from "../../Pages/Authentication/Login";
import API_URL from "../../../Config/GlobalUrl";
import axios from "axios";

// Forgot password update component

const FPUpdate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const { token } = useParams();

  // Event handler for input change

  // Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Password
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  // Confirm Password
  const handleCPassChange = (e) => {
    setCPassword(e.target.value);
  };

  // Function for handle password update operation

  const handleFPUpdateOperation = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !cpassword) {
        alert("Please ensure to provide all fields");
      } else if (password.length <= 4) {
        alert("Please provide characters length more than 4");
      } else if (password !== cpassword) {
        alert("Confirm password was not same as passoword");
      } else {
        const response = await axios.put(`${API_URL}/FPUpdate`, {
          email: email,
          token: token,
          password: password,
        });

        if (response.status == 200) {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Login popup operation

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  // FOR open POPUP OPERATION

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  // FOR CLOSE POPUP OPERATION

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <div className="row m-5 custom-center">
      <div className="auth-FP-container">
        <div className="auth-title-cover custom-center">
          <h3 className="auth-title">Update Password</h3>
        </div>
        <div className="auth-form-container">
        <form className="auth-form">
          {/* Mail Id */}
          <div className="form-control auth-form-control">
            <input
              type="email"
              className="input-style"
              id="name"
              onChange={handleEmailChange}
              placeholder="Enter Your Email Id"
            />
          </div>
          {/* Password */}
          <div className="form-control auth-form-control">
            <input
              type="password"
              className="input-style"
              id="password"
              onChange={handlePassChange}
              placeholder="Enter Your Password"
            />
          </div>
          {/* Confirm  Password */}
          <div className="form-control auth-form-control">
            <input
              type="password"
              className="input-style"
              id="Cpassword"
              onChange={handleCPassChange}
              placeholder="Enter Your Password"
            />
          </div>

          {/* Button */}
          <div className="custom-center">
            <button
              type="submit"
              className="auth-btn"
              onClick={handleFPUpdateOperation}
            >
              Update
            </button>
          </div>
          <hr />
          {/* Login page navigation */}
          <div className="auth-navigator custom-center">
            <p>
              Return to Login page?{" "}
              <span
                onClick={openLoginPopup}
                className="auth-navigator-link pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
        <Login isOpen={isLoginPopupOpen} onRequestClose={closeLoginPopup} />
      </div>
      </div>
  
    </div>
  );
};

export default FPUpdate;
