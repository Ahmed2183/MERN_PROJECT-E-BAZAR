import React from 'react';
import {useDispatch} from 'react-redux';
import { logout } from '../store/reducers/authReducer'; //import reducer function

const AdminNav = ({openSidebar}) => { //openSidebar catch value from Wrapper.js

 const dispatch = useDispatch();

 const adminlogout  = () => {
     dispatch(logout('admin-token')); //Call reducer function
 }

    return (
        <nav className='left-0 sm:left-40 top-0 right-0 mx-0'> {/* sm: means when screen on small size ,lg means large screen */}
            <div className="w-full flex lg:justify-end justify-between items-center p-4 bg-black">
            <i className="bi bi-list text-white text-2xl 
            cursor-pointer sm:hidden block" onClick={openSidebar}></i> {/*For List icon*/}
                <button to="/" className='py-2 px-4 bg-navyblue text-white rounded-md capitalize'
                onClick={adminlogout}>
                <i className="bi bi-box-arrow-right mr-2 inline-block text-lg"></i>
                    Logout
                </button>
            </div>

        </nav>
    );
};

export default AdminNav;