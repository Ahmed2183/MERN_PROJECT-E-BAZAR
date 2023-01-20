//Use in CategoryProduct.js etc..

import React from 'react'
import { Link } from "react-router-dom"
import currency from "currency-formatter"
import { motion } from 'framer-motion'
import { AiFillStar } from 'react-icons/ai'

const ProductCard = ({ product }) => {
  //Formula For Discount Price
  // const percentage = product.discount / 100;
  // const discountprice = product.price - (product.price * percentage);
  const discountprice = product.price - product.discount;
  // console.log(discountprice);

  // For Code Rating
  let result = 0,
   one = 0,
   two = 0,
   three = 0,
   four = 0,
   five = 0,
   total = 0;

   if(product?.reviews?.length > 0) {
    // console.log("Yes Length");
    product?.reviews?.forEach((item) => {
      if(item.rating === 1) {
        one += 1;
      }
      if(item.rating === 2) {
        two += 1;
      }
      if(item.rating === 3) {
        three += 1;
      }
      if(item.rating === 4) {
        four += 1;
      }
      if(item.rating === 5) {
        five += 1;
      }
    });
    total = one + two + three + four + five;
    result = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / total;
   }
   else {
    total = 0;
    result = 0;
   }
   const finalResult = parseFloat(result).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-5 py-10' key={product}>
      <Link to={`/product/${product._id}`}>
        <div className='w-full'>
          <img src={`/images/${product.image1}`} alt="product image"
            className='w-full h-[310px] object-cover' />
        </div>
        <p className='capitalize text-base font-medium text-black my-2.5'>{product.title}</p>
        <div className='flex items-center'>
          <div className='flex items-center space-x-2 mb-1'>
            <span>{finalResult}</span>
            <AiFillStar color="orange"/>
            <span>({total})</span>
          </div>
        </div>
        <div className='flex justify-between'>
          <span className='text-lg font-medium text-black'>
            {currency.format(discountprice, { code: "USD" })}
          </span>
          {product.discount === 0 ?
            <span className='text-lg font-medium text-gray-600 line-through'>
              $0
            </span> :
            <span className='text-lg font-medium text-gray-600 line-through'>
              {currency.format(product.price, { code: "USD" })}
            </span>
          }
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard