import { useState } from "react";
import currency from "currency-formatter"
import DetailsImage from './DetailsImage';
import Quantity from './Quantity';

const DetailCard = ({ product }) => {

    const [quantity, setQantity] = useState(1);

    const increment = () => {
        setQantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity > 1) {
            setQantity(quantity - 1);
        }
    }

    const discountprice = product.price - product.discount;
    console.log("Details", product);

    return (
        <div className='flex flex-wrap -mx-5'>
            <div className='w-full order-2 md:order-1 md:w-6/12 p-5'>  {/* order-1 means show on first, order-2 means show on Second.. */}
                <div className='flex flex-wrap -mx-1'>
                    <DetailsImage image={product.image1} />
                    <DetailsImage image={product.image2} />
                    <DetailsImage image={product.image3} />
                </div>
            </div>
            <div className='w-full order-1 md:order-2 md:w-6/12 p-5'>
                <h1 className='text-2xl font-bold text-black capitalize'>{product.title}</h1>
                <div className='flex justify-between my-5'>
                    <span className='text-2xl font-bold text-black'>
                        {currency.format(discountprice, { code: "USD" })}
                    </span>
                    <span className='text-xl text-gray-500 line-through'>
                        {currency.format(product.price, { code: "USD" })}
                    </span>
                </div>
                {product.sizes.length > 0 && (
                    <>
                        <h3 className='text-base font-medium capitalize text-black mb-2'>Sizes</h3>
                        <div className='flex flex-wrap -mx-1'>
                            {product.sizes.map((size) => (
                                <div className='p-2 m-1 border border-gray-300 rounded cursor-pointer hover:bg-navyblue
                                 hover:text-white transition-all' key={size.name}>
                                    <span className='text-sm font-bold uppercase'>{size.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {product.colors.length > 0 && (
                    <>
                        <h3 className='text-base font-medium capitalize text-black mb-2 mt-3'>Colors</h3>
                        <div className='flex flex-wrap'>
                            {product.colors.map((color) => (
                                <div key={color.color} className="border-gray-300 rounded m-1 p-1 cursor-pointer">
                                    <span className='min-w-[40px] min-h-[40px] rounded block' style={{ background: color.color }}></span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <h3 className='text-base font-medium capitalize text-black mb-2 mt-3'>Quantity</h3>
                <div className='flex -mx-3 items-center'>
                    <div className='w-full sm:w-6/12 p-3'>
                        <Quantity quantity={quantity} increment={increment} decrement={decrement}/>
                    </div>
                    <div className='w-full sm:w-6/12 p-3'>
                        <button className='btn btn-navyblue'>Add To Cart</button>
                    </div>
                </div>
                <h3 className='text-base font-medium capitalize text-black mb-2 mt-3'>Description</h3>
                <div className="mt-4 leading-[27px]">{product.description}</div>
            </div>
        </div>
    )
}

export default DetailCard