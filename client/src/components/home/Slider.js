import React from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Spinner from "../Spinner";
import { useRandomCategoriesQuery } from '../../store/services/categoryServices';

const Slider = () => {

  const { currentData, isFetching } = useRandomCategoriesQuery();
  // console.log(currentData, isFetching)

  return isFetching ? (
    <div className='my-container h-[70vh] flex items-center justify-center'>
      <Spinner />
    </div>
  ) : <>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {currentData?.categories.length > 0 && currentData?.categories.map((cat, index) => (
        <SwiperSlide className='slide' key={cat._id}>
          {/* <div className={`slide-img bg-[url('../public/images/Slider/Slider${index + 1}.jpg')]`}></div> */}
          <div className={'slide-img'}>
            <img src={`./images/Slider/Slider${index + 1}.jpg`} className="w-full h-full object-cover" />
          </div>
          <div className='absolute inset-0 w-full h-full bg-black/50'>
            <div className="my-container h-[70vh] flex flex-col items-center justify-center">
              <h1 className='text-white text-xl font-medium capitalize'>{cat.name}</h1>
              <div className='mt-10'>
                <Link to={`/categoryproducts/${cat.name}`} className="btn btn-red text-sm">Browse Collections</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </>

};

export default Slider;
