import React from 'react';
import { NavLink } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {  BsPersonCheckFill } from "react-icons/bs";
import { AiFillShopping, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { logout } from '../../store/reducers/authReducer';

const AccountList = () => {

    const dispatch = useDispatch();

    return (
        <>
            <NavLink to="/" className="account-list">
                <RiDashboardFill size={22} />
                <span className='account-list-title'>Dashboard</span>
            </NavLink>

            <NavLink to="/user" className="account-list">
                <BsPersonCheckFill size={22} />
                <span className='account-list-title'>My Account</span>
            </NavLink>

            <NavLink to="/orders" className="account-list">
                <AiFillShopping size={22} />
                <span className='account-list-title'>Orders</span>
            </NavLink>

            <span className="account-list cursor-pointer" onClick={() => dispatch(logout('user-token'))}>
                <AiOutlineLogout size={22} />
                <span className='account-list-title'>Logout</span>
            </span>
        </>
    );
};

export default AccountList;