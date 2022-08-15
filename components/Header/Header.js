import React, {useEffect} from 'react';
import style from "./Header.module.css";
import Link from "next/link";
import {useRouter} from 'next/router'

function Header(props) {

	const router = useRouter();

	useEffect(()=>{
		props.authorization &&
			console.log(props.authorization);
	}, [props.authorization])

	const initial = () => {
		return props.authorization.user.username.slice(0,1);
	}
	return (
		<div className={style.headerContainer}>
			<div className={style.header/*router.pathname=="/"?style.header:style.header2*/}>
				<span>
					{
						router.pathname!=="/" &&
							<button onClick={ event => router.back()} className={style.icon}><img src="/icons/back.png" alt="back icon" /></button>
					}
					<Link href="/">
						<div className={style.logo}>
							<img src="/icons/dkutAssociatesSmall.png" />
							<h1>Dkut Associates</h1>
						</div>
					</Link>
				</span>

				<div className={style.icons}>
					<div className={style.icon}>
						<img src="/icons/search.png" alt="search icon" />
					</div>
					{
						props.authorization?
						<div className={style.initial}>
							{initial()}
						</div>
						:<div className={style.icon + " " + style.icon_user}>
							<img src="/icons/user.png" alt="user icon" />
						</div>
					}
					
				</div>
			</div>
		</div>
	)
}

export default Header