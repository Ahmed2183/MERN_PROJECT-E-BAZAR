import React from 'react'
import { Link, useParams } from "react-router-dom";
import ScreenHeader from '../../components/ScreenHeader'
import Wrapper from './Wrapper'
import { useGetOrdersQuery } from '../../store/services/orderServices';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const Orders = () => {

    let { page } = useParams();
    page = page ? page : 1;  // --> Means if page number ha then page number use kro else page number 1 hoga

    const { data, isFetching } = useGetOrdersQuery(page);
    // console.log("Data Orders:", data);

    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="" className="btn-navyblue">
                    <i className="bi bi-arrow-down-circle mr-2 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
                    Orders
                </Link>
            </ScreenHeader>
            {!isFetching ? data?.orders?.length > 0 &&
                <>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="dashboard-table">
                            <thead className="dashboard-thead">
                                <tr>
                                    <th scope="col" className="dashboard-th">
                                        Title
                                    </th>
                                    <th scope="col" className="dashboard-th">
                                        Quantities
                                    </th>
                                    <th scope="col" className="dashboard-th">
                                        Image
                                    </th>
                                    <th scope="col" className="dashboard-th">
                                        Received
                                    </th>
                                    <th scope="col" className="dashboard-th">
                                        Delivered
                                    </th>
                                    <th scope="col" className="dashboard-th">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.orders?.map(order => (
                                    <tr key={order._id} className="dashboard-tr">
                                        <td className="dashboard-td">{order.productId.title}</td>
                                        <td className="dashboard-td">{order.quantities}</td>
                                        <td className="dashboard-td">
                                            <img
                                                src={`/images/${order.productId.image1}`}
                                                alt="image name" // only show image1
                                                className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover"
                                            />{" "}
                                        </td>
                                        <td className="dashboard-td">{order.received ? 'Yes' : 'No'}</td>
                                        <td className="dashboard-td">{order.status ? 'Yes' : 'No'}</td>
                                        <td className="dashboard-td">
                                            <Link
                                                to={`/dashboard/order-details/${order._id}`}
                                                className="btn-black"
                                            >
                                                Details
                                            </Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Send data to Pagination.js as props */}
                    <Pagination
                        page={parseInt(page)} perPage={data.perPage}
                        count={data.count} path="dashboard/orders" />
                </> : <Spinner />}
        </Wrapper>
    )
}

export default Orders