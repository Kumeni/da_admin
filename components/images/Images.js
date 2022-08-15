import React from 'react'
import style from './Images.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'

function Images(props) {

	const imageURL = (image) => {
		
		if(image.image && image.image.formats)
			if(image.image.formats.small)
				return image.image.formats.small.url;
			else if(image.image.formats.medium)
				return image.image.formats.medium.url;
			else if(image.image.formats.large)
				return image.image.formats.large.url;
			else
				return image.image.url;
	}

	return (
		<div className={style.images}>
			{
				props.images &&
					<span className={'text-white'}>{props.images.length}</span>
			}
			
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{
					props.images && props.images.map( (element, index) => (
						<SwiperSlide>
							<div className={props.mosaic?style.imageMosaic:style.image}>
								<img src={props.server+imageURL(element)} alt="" />
							</div>
						</SwiperSlide>
					))
				}
			</Swiper>
		</div>
	)
}

export default Images