import React from 'react'
import style from './Add.module.css'

function Add(props) {
	return (
		<button onClick = { () => props.handleClick()} className={style.button}>
			<span>{props.title}</span>
			<span>+</span>
		</button>
	)
}

export default Add