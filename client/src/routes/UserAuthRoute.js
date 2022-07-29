import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom"

const UserAuthRoute = () => {

    const { userToken } = useSelector((state) => state.authReducer);
    return userToken ? <Navigate to="/user"/> : <Outlet/> 
};

export default UserAuthRoute;