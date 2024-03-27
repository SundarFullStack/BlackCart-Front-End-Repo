import React from "react";
import "./content.css";
// child Component for layout build main content
const Content = () => {
  return (
    <div className="Content-container custom-center">
      {/* content-title */}
      <div className="content-title-cover">
        <p className="content-title custom-center">BlackCart</p>
        {/* Content sub title */}
        <h4 className="content-sub-title custom-center">
          Shop products in style
        </h4>
        <p className="title-content custom-center">
          With this shop make your life in style black
        </p>
      </div>
    </div>
  );
};

export default Content;
