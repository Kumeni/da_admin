import React from 'react'
import Add from '../add/Add'
import Hostel from '../hostel/Hostel'
import style from './Layout1.module.css'

function Layout1(props) {

	return (
		<div className={style.container}>
			<div>
				<h1>{props.title}</h1>
				<div className={style.borderBottom}></div>
				<div className={style.hostels}>
					{ props.children }
				</div>
				<Add 
					title = {props.addTitle}
					handleClick = { () => props.handleClick()}
				/>
			</div>
		</div>
	)
}

export default Layout1