import React from 'react'
import Event from './Event'
import style from './Events.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'

function Events() {
  return (
    <div className={style.container}>
        <h2>Upcoming events</h2>
        <div className={style.events}>

        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <Event 
                    date={"Wed, July 20, 2023"}
                    poster={"/images/wallE.png"}
                    posterDescription={"wallE"}
                    name={"event_name"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Event 
                    date={"Wed, July 20, 2023"}
                    poster={"/images/wallE.png"}
                    posterDescription={"wallE"}
                    name={"event_name"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Event 
                    date={"Wed, July 20, 2023"}
                    poster={"/images/wallE.png"}
                    posterDescription={"wallE"}
                    name={"event_name"}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Event 
                    date={"Wed, July 20, 2023"}
                    poster={"/images/wallE.png"}
                    posterDescription={"wallE"}
                    name={"event_name"}
                />
            </SwiperSlide>
        </Swiper>
            
            
            
        </div>
    </div>
  )
}

export default Events