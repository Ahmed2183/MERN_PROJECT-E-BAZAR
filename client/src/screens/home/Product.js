import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { useGetProductQuery } from '../../store/services/productServices';
import Nav from '../../components/home/Nav'
import DetailCard from '../../components/home/DetailCard';
import ProductLoader from '../../components/home/ProductLoader';

const UserProduct = () => {

    const { name } = useParams();
    const { data, isFetching } = useGetProductQuery(name);
    //    console.log(data,isFetching);

    return (
        <>
            <Nav />
            <div className='my-container mt-24'>
                {isFetching ? <ProductLoader /> :
                    <>
                        <ul className='flex items-center'>
                            <li className='capitalize text-gray-600'>
                                <Link to="/">Home</Link>
                            </li>
                            <FiChevronRight className='block mx-2' />
                            <li className='capitalize text-gray-600'>
                                <Link to={`/categoryproducts/${data.category}`}>{data.category}</Link>
                            </li>
                            <FiChevronRight className='block mx-2' />
                            <li className='capitalize text-gray-600'>
                                <Link to={`/product/${data._id}`}>{data.title}</Link>
                            </li>
                        </ul>
                        <DetailCard product={data} />
                    </>
                }
            </div>
        </>
    )
}

export default UserProduct