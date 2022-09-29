import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import Nav from '../../components/home/Nav';
import Header from "../../components/home/Header";
import AccountList from '../../components/home/AccountList';
import { useGetOrdersQuery } from '../../store/services/userOrdersServices';

const UserOrders = () => {

    let { page } = useParams();
    page = page ? page : 1;

    const { user } = useSelector((state) => state.authReducer);
    console.log(user);
    // console.log(user?.userdata?.id);

    const { data, isFetching } = useGetOrdersQuery({ page, userId: user?.userdata?.id });
    console.log(data)

    return (
        <>
            <Nav />
            <div className='mt-[70px]'>
                <Header>
                    My Orders
                </Header>
                <div className="my-container mt-[40px]">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-4/12 p-6">
                            <AccountList />
                        </div>
                        <div className="w-full md:w-8/12 p-6">
                            <h1 className="heading">Orders</h1>
                            <span className="block mt-3 capitalize font-medium text-sm"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrders