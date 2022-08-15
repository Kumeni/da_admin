import React from 'react'
import style from './Footer.module.css'
import Link from 'next/link'

function Footer() {
  return (
    <div className={style.container}>
        <div>
            <div className={style.logo}>
                <div>
                    <img src="/icons/dkutAssociatesSmall.png" alt="Dkut associates logo" />
                </div>
                <p><em>"Connection == Information"</em></p>
            </div>
            <div className={style.links}>
                <ul>
                    <Link href="/available-rooms"><a>Available rooms</a></Link>
                    <Link href="/"><a>Tenant signup</a></Link>
                    <Link href="/"><a>About us</a></Link>
                </ul>
                <ul>
                    <a href="#">info@dkut.co.ke</a>
                    <a href="#">+254717551542</a>
                    <Link href="/"><a>Contact us</a></Link>
                </ul>
            </div>
        </div>
        <p>Copyright &copy; 2022 | All rights reserved</p>
    </div>
  )
}

export default Footer