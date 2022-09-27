import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../store/reducers/authReducer";
import Clock from "./Clock";

const SideBar = ({ sidebar, closeSidebar }) => {  //sidebar,closeSidebar get values from Wrapper.js

  const dispatch = useDispatch();
  const adminlogout = () => {
    dispatch(logout()); //Call reducer function
  }

  return (
    <div>
      <div className={`fixed top-0 ${sidebar} sm:left-0 w-58 h-screen bg-black z-10
       transition-all`}> {/* sm: means when screen on small size ,transition-all for animated */}
        <i className="bi bi-x-lg absolute top-4 right-4 sm:hidden block
         cursor-pointer text-lg" onClick={closeSidebar}></i> {/*For Close icon*/}
        <div className="">
          <img src="/logo1.PNG" alt="logo" />
        </div>
        <ul className="mt-4">
          {" "}
          {/*hover mean when cursor on Link its show hover:color */}
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-teal-600">
            <i className="bi bi-bag-check-fill mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/products" className="text-base capitalize">
              Products
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-teal-600">
            <i className="bi bi-clipboard-check mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/orders" className="text-base capitalize">
              Orders
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-teal-600">
            <i className="bi bi-people mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/products" className="text-base capitalize">
              Customers
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-teal-600">
            <i className="bi bi-grid-3x3-gap mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/categories" className="text-base capitalize">
              Categories
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-teal-600 absolute bottom-0">
            <i className="bi bi-clock mr-2 inline-block text-lg"></i>
            <Clock />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
