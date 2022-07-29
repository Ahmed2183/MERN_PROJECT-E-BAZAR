import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FiSearch } from "react-icons/fi";
import { BsFillBagCheckFill } from "react-icons/bs";

const Nav = () => {

    const { userToken, user } = useSelector((state) => state.authReducer);
    // console.log(user.userdata.name)

    return (
        <nav className="nav">
            <div className="my-container">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <img src='/logo1.PNG' className='h-16 object-cover' alt='logo' />
                    </Link>
                    <ul className='flex items-center'>
                        <li className='nav-li cursor-pointer'><FiSearch size={23} /></li>
                        {userToken ? <li className='nav-li'><Link to="/user" className='nav-link'>{user?.userdata?.name}</Link></li>
                            :
                            <li className='nav-li'><Link to="/login" className='nav-link'>Sign In</Link></li>
                        }
                        <li className='nav-li relative'>
                            <Link to="/cart">
                                <BsFillBagCheckFill size={23} />
                                <span className='nav-circle'>10</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;