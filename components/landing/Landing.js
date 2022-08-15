import React from 'react'
import style from './Landing.module.css'
import Link from 'next/link'

function Landing() {
  return (
    <div className={style.landing}>
        <div className={style.image}>
            <img src="/images/wallE.png" alt="Hello wallE" />
        </div>
        <div className={style.content}>
            <h1>Hi Comrade,</h1>
            <p>What are you looking for?</p>
            <ul>
                <Link href="#upcoming-events"><a>Upcoming events</a></Link>
                {/* <Link href="/"><a>Products and services</a></Link> */}
                <Link href="/available-rooms"><a>Available rooms</a></Link>
            </ul>
            <p><em>"Connection == Information" ~ Samson</em></p>
        </div>
    </div>
  )
}

export default Landing