import React from 'react'
import style from './Layout2.module.css'
import Add from '../add/Add'

function Layout2(props) {
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

export default Layout2