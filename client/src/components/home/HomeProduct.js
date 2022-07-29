import React from 'react'
import { Link } from 'react-router-dom';
import { useCategoryProductsQuery } from '../../store/services/homeProductsServices';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const HomeProduct = ({ category }) => {

    const { data, isFetching } = useCategoryProductsQuery({
        name: category.name,
        page: ""
    });

    // console.log(data?.products);

    return isFetching ? <ProductSkeleton /> : data?.products?.length > 0 && (
        <>
            <div className='flex justify-between'>
                <span className='text-2xl font-medium capitalize'>{category.name}</span>
                <span className='capitalize'>
                    <Link to={`/categoryproducts/${category.name}`}>See All</Link>
                </span>
            </div>
            <div className="flex flex-wrap -mx-5">
                {data?.products.map((item) => (
                    <ProductCard product={item} key={item._id} />
                ))}
            </div>
        </>
    )
}

export default HomeProduct