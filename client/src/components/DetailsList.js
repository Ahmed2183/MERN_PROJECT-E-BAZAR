import React from 'react'

const DetailsList = ({ label, data }) => {
    return (
        <div className='flex border-b py-2.5'>
            <h4 className='capitalize text-base font-normal text-gray-500'>{label}:</h4>
            <span className='ml-2 font-medium text-black'>{data}</span>
        </div>
    )
}

export default DetailsList