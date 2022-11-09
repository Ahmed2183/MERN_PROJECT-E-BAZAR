import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom"
import Nav from '../../components/home/Nav';
import Header from "../../components/home/Header";
import AccountList from '../../components/home/AccountList';
import { useGetOrdersQuery, useReceivedOrderMutation } from '../../store/services/userOrdersServices';
import Spinner from '../../components/Spinner'
import currency from "currency-formatter"
import { discount } from "../../utils/discount";
import Pagination from '../../components/Pagination'

const UserOrders = () => {

    let { page } = useParams();
    page = page ? page : 1;

    const { user } = useSelector((state) => state.authReducer);
    // console.log(user);
    // console.log(user?.userdata?.id);

    const { data, isFetching } = useGetOrdersQuery({ page, userId: user?.userdata?.id });
    // console.log(data)

    const [updateOrder] = useReceivedOrderMutation();

    const orderReceived = (id) => {
        updateOrder(id);
    }

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
                            <h1 className="heading mv-6">Orders</h1>
                            {!isFetching ? data?.orders?.length > 0 ?
                                <>
                                    <div className='table-container'>
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='thead-tr'>
                                                    <th className='th'>Image</th>
                                                    <th className='th'>Name</th>
                                                    <th className='th'>Total</th>
                                                    <th className='th'>Details</th>
                                                    <th className='th'>Received</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.orders.map(item => {
                                                    const total = currency.format(discount(item.productId.price, item.productId.discount) * item.quantities,
                                                        { code: "USD" }); //Quatities multiply by price
                                                    return (
                                                        <tr className='even:bg-gray-50' key={item._id}>
                                                            <td className='td'>
                                                                <img src={`/images/${item.productId.image1}`} alt={item.productId.title} className='w-12 h-12 object-cover rounded-full' />
                                                            </td>
                                                            <td className='td font-medium'>{item.productId.title}</td>
                                                            <td className='td font-bold'>{total}</td>
                                                            <td className='td'>
                                                                <Link to={`/user-order-details/${item._id}`} className='btn-yellow'>Details</Link>
                                                            </td>
                                                            <td className='td'>
                                                                {item?.status ? item?.received ?
                                                                    <span className='capitalize font-medium text-green-500'>Received</span>
                                                                    : <button className='btn-blue' onClick={() => orderReceived(item?._id)}>Received?</button>
                                                                    : <span className='capitalize font-medium text-red-500'>Under Process</span>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        page={parseInt(page)}
                                        perPage={data.perPage}
                                        count={data.count}
                                        path={`orders`}
                                        theme="light"
                                    />
                                </>
                                : <div className='bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800'>No Orders</div>
                                : <Spinner />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrders