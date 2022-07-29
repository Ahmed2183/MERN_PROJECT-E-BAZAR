import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Quantity = ({ quantity, increment, decrement }) => {
    return (
        <div className='flex last:border-r last:rounded-tr-lg last:rounded-br-lg first:rounded-tl-lg first:rounded-bl-lg overflow-hidden'>
            <span className='flex border p-4 border-r-0 cursor-pointer hover:bg-navyblue hover:text-white transition-all'
                onClick={decrement}>
                <AiOutlineMinus />
            </span>
            <span className='flex-1 border flex items-center justify-center font-medium border-r-0'>
                {quantity}
            </span>
            <span className='flex border p-4 border-r-0 cursor-pointer hover:bg-navyblue hover:text-white transition-all'
                onClick={increment}>
                <AiOutlinePlus />
            </span>
        </div>
    )
}

export default Quantity