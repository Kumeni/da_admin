import React from 'react'
import style from './AvailableRoom.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'

function AvailableRoom(props) {
  return (
    <div className={props.mosaic?style.roomMosaic:style.room}>
        <div className={style.images}>
			<span>5</span>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				<SwiperSlide>
					<div className={props.mosaic?style.imageMosaic:style.image}>
						<img src="/images/wallE.png" alt="wallE" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={props.mosaic?style.imageMosaic:style.image}>
						<img src="/images/wallE.png" alt="wallE" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={props.mosaic?style.imageMosaic:style.image}>
						<img src="/images/wallE.png" alt="wallE" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={props.mosaic?style.imageMosaic:style.image}>
						<img src="/images/wallE.png" alt="wallE" />
					</div>
				</SwiperSlide>
			</Swiper>
        </div>
        <div className={style.content}>
			<p>Bedsitter</p>
			<p>Embassy</p>
			<p>Ksh. 3,000, Ksh.6,000 pm, Ksh.7,000</p>
			<Link href="/available-rooms/room">
				<a className={"bg-success"}>More...</a>
			</Link>
			</div>
    </div>
  )
}

export default AvailableRoom