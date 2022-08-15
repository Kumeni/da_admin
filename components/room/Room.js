import React from 'react'
import style from './Room.module.css'
import Images from '../images/Images'
import TileDetails from '../tileDetails/TileDetails'
import Stats from '../stats/Stats'

function Room(props) {
	return (
		<div className={style.container}>
			<Images 
				server={props.server}
				images = {props.images}
			/>
			<TileDetails
				name={props.name}
				disabled={props.disabled}
				edit = { () => props.roomEdit()}
				delete = { () => props.roomDelete()}
				disable = { () => props.roomDisable()}
				addReferrals = { () => props.addReferrals()}
				referrals = {props.referrals}
			>
				<Stats />
			</TileDetails>
		</div>
	)
}

export default Room