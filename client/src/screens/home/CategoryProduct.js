import React from 'react'
import { useParams } from "react-router-dom"
import Header from '../../components/home/Header'
import Nav from '../../components/home/Nav'
import Skeleton from "../../components/skeleton/Skeleton"
import Thumbnail from "../../components/skeleton/Thumbnail"
import Text from '../../components/skeleton/Text'
import { useCategoryProductsQuery } from '../../store/services/homeProductsServices'
import ProductCard from '../../components/home/ProductCard'
import Pagination from '../../components/Pagination'

const CategoryProduct = () => {

    const { name, page = 1 } = useParams();
    // console.log(name, page);

    const { data, isFetching } = useCategoryProductsQuery({ name, page: parseInt(page) });
    console.log(data, isFetching);

    return (
        <>
            <Nav />
            <div className='mt-[70px]'>
                <Header>#{name}</Header>
            </div>
            <div className="my-container my-10">
                {isFetching ?
                    <div className="flex flex-wrap -mx-4 mb-10">
                        {[1, 2, 3, 4].map((item) => ( //Data is not in array so we use () brackets with map
                            <div className='w-6/12 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12 p-4' key={item}>
                                <Skeleton>
                                    <Thumbnail height="320px" />
                                    <Text mt="10px" />
                                    <Text mt="10px" />
                                </Skeleton>
                            </div>
                        ))}
                    </div>
                    : data.count > 0 ?
                        <>
                            <p className='text-base font-medium text-gray-700'>{data.count} Products Found in {name} Category</p>
                            <div className='flex flex-wrap -mx-5'>
                                {data.products.map((product) => { //Data in array so we use curly brackets with map
                                    return (
                                        <ProductCard product={product} />
                                    )
                                })}
                            </div>
                            <Pagination
                                page={parseInt(page)}
                                perPage={data.perPage}
                                count={data.count}
                                path={`categoryProducts/${name}`}
                                theme="light"
                            />
                        </>
                        : <p className='error'>No Products Found in {name} Category</p>
                }
            </div>
        </>
    )
}

export default CategoryProduct;