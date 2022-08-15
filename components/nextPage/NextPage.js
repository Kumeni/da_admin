import React from 'react'
import Link from 'next/link'
import style from './NextPage.module.css'

function NextPage(props) {
	return (
		<Link href={props.link}>
			<a className={style.container}>
				<span>{props.availableNo && props.availableNo} {props.anchorText && props.anchorText}{props.availableNo > 1 || props.availableNo === 0&& "s"}</span>
				<img src="/icons/back.png" alt="forward icon" />
			</a>
		</Link>
	)
}

export default NextPage