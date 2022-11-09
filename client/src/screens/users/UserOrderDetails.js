import { useParams, useNavigate } from 'react-router-dom';
import currency from "currency-formatter"
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import moment from 'moment';
import Nav from '../../components/home/Nav';
import Header from "../../components/home/Header";
import AccountList from '../../components/home/AccountList';
import { useDetailsQuery } from '../../store/services/userOrdersServices';
import Spinner from '../../components/Spinner';
import { discount } from '../../utils/discount';
import ReviewForm from '../../components/ReviewForm';
import { useState } from 'react';
import DetailsList from '../../components/DetailsList';

const UserOrderDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();  //-->Send id to url
    const { data, isFetching } = useDetailsQuery(id);
    // console.log("Orders",data);

    const [state, setState] = useState(false);

    const toggleReview = () => {
        setState(!state);
    }

    const total = currency.format(discount(data?.details?.productId?.price, data?.details?.productId?.discount) * data?.details?.quantities,
        { code: "USD" }); //Quantities multiply by price

    return (
        <>
            <ReviewForm state={state} data={data} toggleReview={toggleReview} />
            <Nav />
            <div className='mt-[70px]'>
                <Header>
                    Order Details
                </Header>
                <div className="my-container mt-[40px]">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-4/12 p-6">
                            <AccountList />
                        </div>
                        <div className="w-full md:w-8/12 p-6">
                            <h1 className="heading flex items-center">
                                <MdOutlineKeyboardBackspace className='cursor-pointer' onClick={() => navigate(-1)} /> {/* --> -1 means eik page peecha jao */}
                                <span className='ml-3'>Details</span>
                            </h1>
                            {!isFetching ?
                                <div className='flex flex-col md:flex-row flex-wrap my-5'>
                                    <div className='w-[130px] md:w-[160px] h-[130px] md:h-[160px] overflow-hidden'>
                                        <img src={`/images/${data?.details?.productId?.image1}`} alt=""
                                            className='w-full h-full object-cover rounded-md' />
                                    </div>
                                    <div className='flex-1 my-4 md:my-0 ml-4'>
                                        <DetailsList label="Order Number" data={data?.details?._id} />
                                        <DetailsList label="Product Name" data={data?.details?.productId?.title} />
                                        <DetailsList label="Order Received" data={data?.details?.received ? 'Yes' : 'No'} />
                                        <DetailsList label="Order Date" data={moment(data?.details?.createdAt).format("dddd, MMMM Do YYYY")} />
                                        {data?.details?.received &&
                                            <DetailsList label="Received Date" data={moment(data?.details?.updatedAt).format("dddd, MMMM Do YYYY")} />
                                        }
                                        {data?.details?.received && !data?.details?.review && (
                                            <div className='flex mt-2 items-center justify-between'>
                                                <h4 className='capitalize text-base font-normal text-gray-500 mr-5'>Add Rating</h4>
                                                <button className='btn-blue rounded !py-2 !text-sm' onClick={() => toggleReview()}>Add Review</button>
                                            </div>
                                        )}
                                        <div className='overflow-x-auto mt-4'>
                                            <table className='w-full'>
                                                <thead>
                                                    <tr className='thead-tr'>
                                                        <th className='th'>Color</th>
                                                        <th className='th'>Size</th>
                                                        <th className='th'>Price</th>
                                                        <th className='th'>Quantities</th>
                                                        <th className='th'>Total</th>
                                                        <th className='th'>Delivered</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='even:bg-gray-50'>
                                                        <td className='td'>
                                                            <span className='block w-[15px] h-[15px] rounded-full' style={{ backgroundColor: data?.details?.color }}></span>
                                                        </td>
                                                        <td className="td">
                                                            <span className='font-semibold'>{data?.details?.size}</span>
                                                        </td>
                                                        <td className='td font-bold'>{currency.format(discount(data?.details?.productId?.price, data?.details?.productId?.discount),
                                                            { code: "USD" })}
                                                        </td>
                                                        <td className="td">{data?.details?.quantities}</td>
                                                        <td className="td">{total}</td>
                                                        <td className="td">{data?.details?.status ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : <Spinner />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOrderDetails;