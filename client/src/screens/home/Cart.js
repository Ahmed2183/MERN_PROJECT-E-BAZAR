import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { motion } from 'framer-motion'
import currency from "currency-formatter"
import swal from 'sweetalert';
import Nav from '../../components/home/Nav'
import { discount } from '../../utils/discount'
import Quantity from '../../components/home/Quantity'
import { incrementQuantity, decrementQuantity, removeItem } from '../../store/reducers/cartReducer'
import { useSendPaymentMutation } from '../../store/services/paymentServices'

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cart, total } = useSelector((state) => state.cartReducer);
    // console.log(cart);
    const { userToken, user } = useSelector((state) => state.authReducer);
    // console.log(user?.userdata?.id);

    const [doPayment, response] = useSendPaymentMutation();  //->We create doPayment function to call in pay function, use any name instead of doPayment
    // console.log("Payment Response", response);

    useEffect(() => {
        if (response?.isSuccess) {
            window.location.href = response?.data?.url;  //-->Redirect to response url
        }
    }, [response])


    const increment = (id) => {
        dispatch(incrementQuantity(id));
    }

    const decrement = (id) => {
        dispatch(decrementQuantity(id));
    }

    const remove = (id) => {
        swal({
            title: "Are you sure?",
            text: "Want to delete this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your Item has been deleted!", {
                        icon: "success",
                    });
                    dispatch(removeItem(id));
                } else {
                    swal("Your item is safe!");
                }
            });
    }

    const pay = () => {
        if (userToken) {
            doPayment({ cart, id: user?.userdata?.id  });  //-->Send cart data and user id to paymentServices.js
        }
        else {
            navigate('/login');
        }
    }

    return (
        <>
            <Nav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} className='my-container mt-28'>
                {cart.length > 0 ?
                    <>
                        <div className='table-container'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='thead-tr'>
                                        <th className='th'>Image</th>
                                        <th className='th'>Name</th>
                                        <th className='th'>Color</th>
                                        <th className='th'>Size</th>
                                        <th className='th'>Price</th>
                                        <th className='th'>Quantities</th>
                                        <th className='th'>Total</th>
                                        <th className='th'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => {
                                        const total = currency.format(discount(item.price, item.discount) * item.quantity, { code: "USD" }); //Quatity multiply by price
                                        return (
                                            <tr className='even:bg-gray-50' key={item._id}>
                                                <td className='td'>
                                                    <img src={`/images/${item.image1}`} alt={item.title} className='w-12 h-12 object-cover rounded-full' />
                                                </td>
                                                <td className='td font-medium'>{item.title}</td>
                                                <td className='td'>
                                                    <span className='block w-[15px] h-[15px] rounded-full' style={{ backgroundColor: item.color }}></span>
                                                </td>
                                                <td className='td'>
                                                    <span className='font-semibold'>{item.size}</span>
                                                </td>
                                                <td className='td font-bold text-black'>{currency.format(discount(item.price, item.discount), { code: "USD" })}</td>
                                                <td className='td'>
                                                    <Quantity quantity={item.quantity}
                                                        increment={() => increment(item._id)}
                                                        decrement={() => decrement(item._id)}
                                                        theme='navyblue' />
                                                </td>
                                                <td className='td font-bold'>{total}</td>
                                                <td className='td'>
                                                    <span className='cursor-pointer' onClick={() => remove(item._id)}>
                                                        <BsTrash color='black' size={20} /></span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='bg-indigo-50 p-4 flex justify-end mt-5 rounded-md'>
                            <div>
                                <span className='text-lg font-semibold text-green-600 mr-10'>
                                    {currency.format(total, { code: 'USD' })}
                                </span>
                                <button className='btn-red text-sm font-medium py-2.5' onClick={pay}>
                                    {response.isLoading ? 'Loading...' : 'CheckOut'}
                                </button>
                            </div>
                        </div>
                    </>
                    : <div className='bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800'>Cart is Empty</div>
                }
            </motion.div>
        </>
    )
}

export default Cart;