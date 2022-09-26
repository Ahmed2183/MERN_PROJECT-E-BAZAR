import React from 'react'
import { Link, useParams } from "react-router-dom"
import currency from "currency-formatter"
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import Spinner from '../../components/Spinner'
import { useDetailsQuery } from '../../store/services/orderServices';
import { discount } from "../../utils/discount"

const OrderDetails = () => {

    const { id } = useParams();
    const { data, isFetching } = useDetailsQuery(id);
    const { details } = data ?? {};  //--->Destructure data property 
    console.log(details);
    const total = discount(details?.productId.price, details?.productId?.discount) * details?.quantities;

    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/orders" className="btn-navyblue">
                    <i className="bi bi-arrow-left-circle mr-1 inline-block text-lg px-1 py-1 cursor-pointer transition-all"></i>
                    Order List
                </Link>
            </ScreenHeader>
            {!isFetching ?
                <>
                    <h3 className='capitalize text-black font-bold'> Order Number
                        <span className='text-lg text-gray-500 ml-4'>#{details?._id}</span>
                    </h3>
                    <div className='flex flex-wrap -mx-5'>
                        <div className='w-full md:w-8/12 p-5'>
                            <div>
                                <table className='dashboard-table'>
                                    <thead>
                                        <tr className='dashboard-tr'>
                                            <th className='dashboard-th'>Image</th>
                                            <th className='dashboard-th'>Quantities</th>
                                            <th className='dashboard-th'>Price</th>
                                            <th className='dashboard-th'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="dashboard-tr">
                                            <td className="dashboard-td">
                                                <img
                                                    src={`/images/${details?.productId?.image1}`}
                                                    alt="image name"
                                                    className="w-[50px] h-[50px]  rounded-full object-cover"
                                                />{" "}
                                            </td>
                                            <td className="dashboard-td">{details?.quantities}</td>
                                            <td className="dashboard-td">
                                                {currency.format(discount(details?.productId?.price, details?.productId?.discount), { code: "USD" })}
                                            </td>
                                            <td className="dashboard-td">{currency.format(total, { code: "USD" })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='w-full md:w-4/12 p-5'>
                            <div className='bg-gray-900 p-4 rounded-md'>
                                <div className='border-b pb-3 border-b-white'>
                                    <h4 className='capitalize text-base text-white'>Customer Name</h4>
                                    <span className='text-white text-base font-medium capitalize mt-2'>{details?.userId?.name}</span>
                                </div>
                                <div>
                                    <h4 className='capitalize text-base text-white mt-2'>Shipping Address</h4>
                                    <div className='mt-2'>
                                        <span className='text-white capitalize block'>{details?.address?.city}</span>
                                        <span className='text-white capitalize block'>{details?.address?.line1}</span>
                                        <span className='text-white capitalize block'>{details?.address?.line2}</span>
                                        <span className='text-white capitalize block'>{details?.address?.postal_code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <Spinner />}
        </Wrapper>
    )
}

export default OrderDetails