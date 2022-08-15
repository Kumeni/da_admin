import React from 'react'
import style from './Referrals.module.css'
import Link from 'next/link'

function Referrals(props) {

	const handleClick = event => {
		event.preventDefault();
		props.addReferrals();
	}
	return (
		<div className={style.container}>
			<p>Referrals</p>
			<div className={style.remaining}>
				<p>
					<span>Remaining </span>
					<span>{props.referrals && props.referrals}</span>
				</p>
				<Link href="#">
					<a onClick = { event => handleClick(event)}className={"bg-primary text-white"}>+</a>
				</Link>
			</div>
		</div>
	)
}

export default Referrals