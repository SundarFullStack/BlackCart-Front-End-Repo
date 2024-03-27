import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Login from "../../Pages/Authentication/Login";
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

// Sign up component

const SignUp = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  // Event handler for input change
  // Name
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
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

  // Function for handling sign up operation

  const handleSignUpOperation = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !cpassword) {
        alert("Please ensure to provide all fields");
      } else if (password !== cpassword) {
        alert("Confirm password was not same as passoword");
      } else if (name.length <= 3 || password.length <= 4) {
        alert("Please provide characters length more than 4");
      } else {
        const response = await axios.post(`${API_URL}/signup/verify`, {
          name: name,
          email: email,
          password: password,
        });

        // console.log("response", response.status)
        // console.log("response", response.data.message)

        if (response.status == 200) {
          // console.log(response.data.message);
          alert("Registration link successfully send for you mail Id")
        } else if (response.status == 201) {
          // console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };
  //Login Popup

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  // FOR Open POPUP OPERATION

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  // FOR CLOSE POPUP OPERATION

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
            <div className="col-6 custom-left">
              <h3 className="auth-title">Sign Up</h3>
            </div>
            {/* Close Button */}
            <div className="col-6 custom-right">
              <IoClose
                onClick={onRequestClose}
                className="auth-close-icon pointer"
              />
            </div>
          </div>
          <div className="auth-form-container">
            <form className="auth-form">
              {/* Name */}
              <div className="form-control">
                <input
                  type="text"
                  className="input-style"
                  id="name"
                  onChange={handleNameChange}
                  placeholder="Enter Your Name"
                />
              </div>
              {/* Mail Id */}
              <div className="form-control">
                <input
                  type="email"
                  className="input-style"
                  id="email"
                  onChange={handleEmailChange}
                  placeholder="Enter Your Email"
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
              {/* Confirm Password */}
              <div className="form-control">
                <input
                  type="password"
                  className="input-style"
                  id="Cpassword"
                  onChange={handleCPassChange}
                  placeholder="Enter Your Password"
                />
              </div>

              {/* Create account button */}
              <div className="custom-center">
                <button
                  type="submit"
                  className="auth-btn"
                  onClick={handleSignUpOperation}
                >
                  Create Account
                </button>
              </div>
              <hr />
              {/* Login button  */}
              <div className="auth-navigator custom-center">
                <p>
                  Already have an account?{" "}
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

export default SignUp;
