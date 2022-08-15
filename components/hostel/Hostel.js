import React from 'react'
import style from './Hostel.module.css'
import TileDetails from '../tileDetails/TileDetails'
import NextPage from '../nextPage/NextPage'

function Hostel(props) {

	return (
		<div className={style.container}>
			<TileDetails
				name={props.name}
				disabled={props.disabled}
				edit = { () => props.hostelEdit()}
				delete = { () => props.hostelDelete()}
                disable = { () => props.hostelDisable()}
				addReferrals = { () => props.addReferrals()}
				referrals = {props.referrals}
			>
				<NextPage 
					link = {props.link}
					availableNo = {props.buildings}
					anchorText = {"Building"}
				/>
			</TileDetails>
		</div>
	)
}

export default Hostel