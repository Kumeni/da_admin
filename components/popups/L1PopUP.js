import React from 'react'
import style from './L1PopUp.module.css'

function L1PopUP(props) {

	if (props.popup === true)
		return (
			<div className={style.container}>
				<div>
					<div className={style.statusBar}></div>
					<div onClick = { () => props.handleClick(false)} className={style.closeButton}>
						<span>&times;</span>
					</div>
					{props.children}
				</div>
			</div>
		)

	return null
}

export default L1PopUP