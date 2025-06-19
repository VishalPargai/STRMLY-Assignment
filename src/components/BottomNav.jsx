import React from "react";
import "./BottomNav.css";
import { FaRegUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="nav-item"><CiPlay1/></div>
      <div className="nav-item"><IoVideocamOutline/></div>
      <div className="nav-item add"><MdOutlineAddBox/></div>
      <div className="nav-item"><FaSearch/></div>
      <div className="nav-item"><FaRegUser/></div>
    </div>
  );
};

export default BottomNav;
