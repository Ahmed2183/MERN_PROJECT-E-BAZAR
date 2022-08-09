import React from 'react'
import { useParams } from "react-router-dom"
import Header from '../../components/home/Header'
import Nav from '../../components/home/Nav'
import { useSearchProductsQuery } from '../../store/services/homeProductsServices'
import ProductCard from '../../components/home/ProductCard'
import Pagination from '../../components/Pagination'
import ProductSkeleton from '../../components/home/ProductSkeleton'

const SearchProduct = () => {

    const { keyword, page = 1 } = useParams();
    // console.log(keyword, page);

    const { data, isFetching } = useSearchProductsQuery({ keyword, page: parseInt(page) });
    // console.log(data, isFetching);

    return (
        <>
            <Nav />
            <div className='mt-[70px]'>
                <Header>#{keyword}</Header>
            </div>
            <div className="my-container my-10">
                {isFetching ?
                    <ProductSkeleton />
                    : data.count > 0 ?
                        <>
                            <p className='text-base font-medium text-gray-700'>{data.count} Products Found For {keyword} Keyword</p>
                            <div className='flex flex-wrap -mx-5'>
                                {data.products.map((product) => { //Data in array so we use curly brackets with map
                                    return (
                                        <ProductCard product={product} key={product._id} />
                                    )
                                })}
                            </div>
                            <Pagination
                                page={parseInt(page)}
                                perPage={data.perPage}
                                count={data.count}
                                path={`categoryproducts/${keyword}`}
                                theme="light"
                            />
                        </>
                        : <p className='error'>No Products Found in {keyword} Keyword</p>
                }
            </div>
        </>
    )
}

export default SearchProduct;