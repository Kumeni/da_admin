import React from 'react'
import style from './Building.module.css'
import TileDetails from '../tileDetails/TileDetails'
import NextPage from '../nextPage/NextPage'
import Images from '../images/Images'

function Building(props) {
	return (
		<div className={style.container}>
			<Images 
				server={props.server}
				images = {props.images}
			/>
			<TileDetails
				name={props.name}
				disabled={props.disabled}
				edit = { () => props.buildingEdit()}
				delete = { () => props.buildingDelete()}
				disable = { () => props.buildingDisable()}
				addReferrals = { () => props.addReferrals()}
				referrals = {props.referrals}
			>
				<NextPage 
					link = {props.link}
					availableNo = {props.rooms}
					anchorText = {"Room"}
				/>
			</TileDetails>
		</div>
	)
}

export default Building