import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch } from "react-icons/fi";
import { BsFillBagCheckFill } from "react-icons/bs";
import Search from './Search';
import { toggleSearchBar } from '../../store/reducers/globalReducer';

const Nav = () => {

    const dispatch = useDispatch();

    const { userToken, user } = useSelector((state) => state.authReducer);
    // console.log(user.userdata.name)
    const { searchBar } = useSelector((state) => state.globalReducer);
    const { items, total } = useSelector((state) => state.cartReducer);
    // console.log(total);


    return (
        <>
            <nav className="nav">
                <div className="my-container">
                    <div className="flex justify-between items-center">
                        <Link to="/">
                            <img src='/logo1.PNG' className='h-16 object-cover' alt='logo' />
                        </Link>
                        <ul className='flex items-center'>
                            <li className='nav-li cursor-pointer'>
                                <FiSearch size={23} onClick={() => dispatch(toggleSearchBar())} />
                            </li>
                            {userToken ? <li className='nav-li'><Link to="/user" className='nav-link'>{user?.userdata?.name}</Link></li>
                                :
                                <li className='nav-li'><Link to="/login" className='nav-link'>Sign In</Link></li>
                            }
                            <li className='nav-li relative'>
                                <Link to="/cart">
                                    <BsFillBagCheckFill size={23} />
                                    <span className='nav-circle'>{items}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Search />
        </>
    );
};

export default Nav;