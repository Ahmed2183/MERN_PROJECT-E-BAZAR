import React from 'react';
import { Link } from 'react-router-dom';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAllCategoriesQuery } from '../../store/services/categoryServices';
import Skeleton from '../skeleton/Skeleton';
import Thumbnail from '../skeleton/Thumbnail';

const Categories = () => {

    const { data, isFetching } = useAllCategoriesQuery();
    let i = 1;

    return isFetching ?
        <div className="flex flex-wrap -mx-4 mb-10">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div className='w-6/12 sm:w-4/12 md:w-3/12 lg:w-[20%] xl:w-2/12 p-4' key={item}>
                    <Skeleton>
                        <Thumbnail height="150px"/>
                    </Skeleton>
                </div>
            ))}
        </div>
        : data?.categories.length > 0 &&
        <Swiper className='w-full h-[150px] mb-10' modules={[Virtual]} spaceBetween={20} slidesPerView={3} virtual
            breakpoints={{  //In breakpoints all numbers are screen widths 0, 640, 768 etc...
                0: {
                    slidesPerView: 2, //On small screen 2 slides show
                },
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1080: {
                    slidesPerView: 5,
                },
                1280: {
                    slidesPerView: 6,
                },
            }}
        >
            {data.categories.map((category, index) => {
                if (i >= 7) { //If categories greater than 5 then show images from 1 again
                    i = 1;
                }
                else {
                    i++;
                }
                return (
                    <SwiperSlide className='w-full overflow-hidden rounded-lg relative' key={index} virtualIndex={index}>
                        <div className='w-full h-[150px] rounded-lg overflow-hidden'>
                            <img src={`./images/Virtual/${i}.jpg`} className="w-full h-full object-cover" />
                        </div>
                        <div className='absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center p-4'>
                            <Link to={`/categoryproducts/${category.name}`} className='text-white text-base font-medium capitalize'>{category.name}</Link>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
};

export default Categories;