import React from 'react'
import AvailableRoom from './AvailableRoom'
import style from './AvailableRooms.module.css'
import Link from 'next/link'

function AvailableRooms() {
  return (
    <div className={style.container}>
        <div className={style.title}>
          <h2>Available rooms</h2>
          <Link href="/available-rooms"><a>More</a></Link>
        </div>
        
        <div className={'scrollContainer'}>
          <AvailableRoom />
          <AvailableRoom />
          <AvailableRoom />
          <AvailableRoom />
          <AvailableRoom />
        </div>
    </div>
  )
}

export default AvailableRooms