import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { HiPrinter } from 'react-icons/hi'
import { Link, useParams, useNavigate } from "react-router-dom"
import currency from "currency-formatter"
import moment from 'moment';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import Spinner from '../../components/Spinner'
import { useDetailsQuery, useDeliverOrderMutation } from '../../store/services/orderServices';
import { discount } from "../../utils/discount"

const OrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const componentRef = useRef();  //-->use in <ReactToPrint> tag

    const { data, isFetching } = useDetailsQuery(id);
    const { details } = data ?? {};  //--->Destructure data property 
    // console.log(details);

    const total = discount(details?.productId.price, details?.productId?.discount) * details?.quantities;

    const [sentUserOrder, response] = useDeliverOrderMutation();

    const sentOrder = () => {
        sentUserOrder(details?._id);
    }

    return (
        <Wrapper>
            <ScreenHeader>
                <div className='flex justify-between'>
                    <button className='btn-navyblue mr-1 py-2 px-4' onClick={() => navigate('/dashboard/orders')}>
                        <i className="bi bi-arrow-left-circle mr-1 inline-block text-lg cursor-pointer transition-all"></i>
                        <span className='mr-1 pt-1'>Order Details</span>
                    </button>
                    <div className='flex items-center justify-around'>
                        <span>
                            {!isFetching && !details?.status && (
                                <button className='btn-yellow mr-1 py-2 px-4' onClick={sentOrder} >
                                    {response?.isLoading ? 'Loading....' : 'Delivered Order'}
                                </button>
                            )}
                        </span>
                        <span>
                            <ReactToPrint
                                trigger={() => (
                                    <button className='flex items-center btn-red mr-1 py-2 px-4'>
                                        <HiPrinter className='mr-1' /> <span> Print this out!</span>
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                        </span>
                    </div>
                </div>
            </ScreenHeader>
            {!isFetching ?
                <div ref={componentRef}>  {/* --->This means we will only print that are inside that div. ref to <ReactToPrint> tag */}
                    <h3 className='capitalize text-black font-bold'> Order Number:
                        <span className='text-lg text-gray-500 ml-4'>#{details?._id}</span>
                    </h3>
                    <h3 className='capitalize text-black font-bold mt-2'> Order Date:
                        <span className='text-lg text-gray-500 ml-4'>{moment(details?.createdAt).format("dddd, MMMM Do YYYY")}</span>
                    </h3>
                    {details?.received &&
                        <h3 className='capitalize text-black font-bold mt-2'> Received Date:
                            <span className='text-lg text-gray-500 ml-4'>{moment(details?.updatedAt).format("dddd, MMMM Do YYYY")}</span>
                        </h3>
                    }
                    <div className='flex flex-wrap -mx-5'>
                        <div className='w-full md:w-8/12 p-5'>
                            <div>
                                <table className='dashboard-table rounded-none md:rounded-md'>
                                    <thead>
                                        <tr className='dashboard-tr'>
                                            <th className='dashboard-th'>Image</th>
                                            <th className='dashboard-th'>Quantities</th>
                                            <th className='dashboard-th'>Price</th>
                                            <th className='dashboard-th'>Size</th>
                                            <th className='dashboard-th'>Color</th>
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
                                            <td className="dashboard-td">{details?.size ? details?.size : 'No Size'}</td>
                                            <td className="dashboard-td">
                                                <span className='block w-[15px] h-[15px] rounded-full' style={{ background: details?.color }}></span>
                                            </td>
                                            <td className="dashboard-td">{currency.format(total, { code: "USD" })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='w-full md:w-4/12 p-5'>
                            <div className='bg-gray-900 p-4 rounded-none md:rounded-md'>
                                <div className='border-b pb-3 border-b-white'>
                                    <h4 className='capitalize text-base text-yellow-700 font-bold'>Customer Name</h4>
                                    <span className='text-white text-base font-medium capitalize mt-2'>{details?.userId?.name}</span>
                                </div>
                                <div className='border-b pb-3 border-b-white'>
                                    <h4 className='capitalize text-base text-yellow-700 font-bold mt-2'>Product Name</h4>
                                    <span className='text-white text-base font-medium capitalize mt-2'>{details?.productId?.title}</span>
                                </div>
                                <div>
                                    <h4 className='capitalize text-base text-yellow-700 font-bold mt-2'>Shipping Address</h4>
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
                </div>
                : <Spinner />}
        </Wrapper>
    )
}

export default OrderDetails