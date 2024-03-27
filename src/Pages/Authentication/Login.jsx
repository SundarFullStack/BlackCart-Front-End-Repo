import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import SignUp from "../../Pages/Authentication/SignUp";
import ForgotPassword from "../../Pages/Authentication/ForgotPassword";
import API_URL from "../../../Config/GlobalUrl";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

// Component for User login

const Login = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  // Event handlers for inputs

  // Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Password
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  // Function for handling login operation

  const handleLoginOperation = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Please ensure to provide all fields");
      } else {
        const response = await axios.post(`${API_URL}/login`, {
          email: email,
          password: password,
        });
        // console.log("login",response.data.token);
        // console.log(email,password)

        if (response.status == 200) {
          localStorage.setItem("UserInfo", JSON.stringify(response.data.token));
          // alert(response.data.message);
          navigator("/Home");
          onRequestClose(false);
        } else if (response.status == 201) {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  //login popup operation

  const [isPopupOpen, setPopupOpen] = useState(false);

  // FOR OPEN POPUP OPERATION

  const openPopup = () => {
    setPopupOpen(true);
  };

  // FOR CLOSE POPUP OPERATION

  const closePopup = () => {
    setPopupOpen(false);
  };

  // Forgot Password popup

  const [isFPPopupOpen, setFPPopupOpen] = useState(false);

  // FOR Open POPUP OPERATION

  const openFPPopup = () => {
    setFPPopupOpen(true);
  };

  // FOR CLOSE POPUP OPERATION

  const closeFPPopup = () => {
    setFPPopupOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="auth-container">
          <div className="row auth-title-container">
            <div className="col-6 auth-title-cover custom-left">
              <h3 className="auth-title">Login</h3>
            </div>
            {/* Close button */}
            <div className="col-6 auth-close-icon-cover custom-right pointer">
              <IoClose onClick={onRequestClose} className="auth-close-icon " />
            </div>
          </div>
          <div className="auth-form-container">
            <form className="auth-form">
              {/* Mail Id */}
              <div className="form-control">
                <input
                  type="email"
                  className="input-style"
                  id="name"
                  onChange={handleEmailChange}
                  placeholder="Enter Your Email Id"
                />
              </div>
              {/* Password */}
              <div className="form-control">
                <input
                  type="password"
                  className="input-style"
                  id="password"
                  onChange={handlePassChange}
                  placeholder="Enter Your Password"
                />
              </div>

              {/* Button */}
              <div className="custom-center">
                <button
                  type="submit"
                  className="auth-btn"
                  onClick={handleLoginOperation}
                >
                  Login
                </button>
              </div>
              <hr />
              {/* Sign Up navigator button */}
              <div className="auth-navigator custom-center">
                <p>
                  New to BlackCart?{" "}
                  <span
                    onClick={openPopup}
                    className="auth-navigator-link pointer"
                  >
                    SignUp
                  </span>
                </p>
              </div>
              {/*Forgot password navigator button */}
              <div className="auth-navigator custom-center">
                <p>
                  Forgot Password?{" "}
                  <span
                    onClick={openFPPopup}
                    className="auth-navigator-link pointer"
                  >
                    Update Password
                  </span>
                </p>
              </div>
            </form>
            <SignUp isOpen={isPopupOpen} onRequestClose={closePopup} />
            <ForgotPassword
              isOpen={isFPPopupOpen}
              onRequestClose={closeFPPopup}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
