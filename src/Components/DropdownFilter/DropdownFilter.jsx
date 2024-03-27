import React, { useState, useContext } from "react";
import "./dropdownFilter.css";
import { useNavigate, Link } from "react-router-dom";
import { FaSortDown } from "react-icons/fa6";
import { LoginContext } from "../Context/ContextProvider";

// Child component for Header for show dropdown

const DropdownFilter = ({ data }) => {
  const { ProductDetail, setProductDetail } = useContext(LoginContext);
  const [searchResults, setSearchResults] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigator = useNavigate();

  //   console.log(data);

  // Function fo handling toggle events

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Function for handling filter operation

  const [searchText, setSearchText] = useState("");

  // Function for handling changes happens in input field

  const handleFilterChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // Function for handling filtration in respective array

  const filterData = (item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    );
  };

  const filteredData = data.filter(filterData);

  //   console.log(filteredData);

  // Function for handling dropdown content visibility

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  //  Function for handling click event in dropdown lists

  const handleListClickFunc = async (value) => {
    // console.log("result", result);
    try {
      await setProductDetail(value);
      // console.log(ProductDetail)
      await navigator("/ProductDetail");
      await setIsOpenDropdown(!isOpenDropdown);
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  return (
    <>
      <div className="search-bar-cover">
        <form>
          {/* search Bar */}
          <div className="form-control search-form-control">
            <input
              type="text"
              className="search-input-style"
              placeholder="Search for products..."
              onChange={handleFilterChange}
              value={searchText}
              onClick={toggleDropdown}
            />
            {/* Dropdown */}
            {isOpenDropdown && (
              <div className="dropdown-menu">
                <ul className="dropdown-list-cover">
                  {filteredData.length > 0 &&
                    filteredData.map((result, index) => (
                      <li key={index + 1} className="dropdown-list">
                        <div className="row">
                          <div className="col-lg-2 custom-center">
                            <img src={result.ImgUrl} className="dropdown-img" />
                          </div>
                          <div className="col-lg-10 custom-left">
                            <span
                              className="dropdown-filter-content"
                              onClick={() => handleListClickFunc(result)}
                            >
                              {result.productName}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default DropdownFilter;
