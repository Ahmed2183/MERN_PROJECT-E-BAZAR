import React from 'react'
import { useSelector } from 'react-redux'
import { BsTrash } from 'react-icons/bs'
import currency from "currency-formatter"
import Nav from '../../components/home/Nav'
import { discount } from '../../utils/discount'
import Quantity from '../../components/home/Quantity'

const Cart = () => {

    const { cart } = useSelector((state) => state.cartReducer);
    console.log(cart);

    const increment = () => {
    }

    const decrement = () => {
    }

    return (
        <>
            <Nav />
            <div className='my-container mt-28'>
                {cart.length > 0 ? <div className='table-container'>
                    <table className='w-full'>
                        <thead>
                            <tr className='thead-tr'>
                                <th className='th'>Image</th>
                                <th className='th'>Name</th>
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
                                    <tr className='even:bg-gray-50'>
                                        <td className='td'>
                                            <img src={`/images/${item.image1}`} alt={item.title} className='w-12 h-12 object-cover rounded-full' />
                                        </td>
                                        <td className='td font-medium'>{item.title}</td>
                                        <td className='td font-bold text-black'>{currency.format(discount(item.price, item.discount), { code: "USD" })}</td>
                                        <td className='td'> <Quantity quantity={item.quantity} increment={increment} decrement={decrement}
                                            theme='navyblue' /></td>
                                        <td className='td font-bold'>{total}</td>
                                        <td className='td'><span className='cursor-pointer'><BsTrash color='black' size={20}/></span></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                    : 'Cart is Empty'
                }
            </div>
        </>
    )
}

export default Cart;