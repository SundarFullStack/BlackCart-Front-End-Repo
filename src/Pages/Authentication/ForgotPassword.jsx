import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Login from "../../Pages/Authentication/Login";
import API_URL from "../../../Config/GlobalUrl";
import axios from "axios";
import { RiAlertLine } from "react-icons/ri";

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

// POPUP FOR IDENTIFYING PROFILE STOCK IN SEARCHED PROFILE CODE

const ForgotPassword = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState("");

  // Event handler for input change

  //Function for handling  changes happen in email

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function for handling forgot password operation

  const handleForgotPasswordOperation = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        RiAlertLine("Please ensure to provide email");
      } else {
        const response = await axios.post(`${API_URL}/forgotpassword`, {
          email: email,
        });

        if (response.status == 200) {
          alert(response.data.message);
        } else if (response.status == 201) {
          alert(response.data.message);
        } else {
          alert(response.status);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Login Popup Operations

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  //Function for  Open Login popup

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  // Function for close login popup

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
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
              <h3 className="auth-title">Send Email</h3>
            </div>
            {/* Close button */}
            <div className="col-6 auth-close-icon-cover custom-right pointer">
              <IoClose onClick={onRequestClose} className="auth-close-icon " />
            </div>
            {/* Notes */}
            <p
              style={{ color: "gray", marginTop: "20px" }}
              className="custom-center"
            >
              Note: Please kindly check your Gmail for messages
            </p>
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

              {/* Button */}
              <div className="custom-center">
                <button
                  type="submit"
                  className="auth-btn"
                  onClick={handleForgotPasswordOperation}
                >
                  Submit
                </button>
              </div>
              <hr />
              {/* Login Navigation */}
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
      </Modal>
    </div>
  );
};

export default ForgotPassword;
