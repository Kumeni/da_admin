import React from 'react'
import style from './Event.module.css'

function Event(props) {
  return (
    <div className={style.event}>
        <p><em>{props.date}</em></p>
        <img src={props.poster} alt={props.posterDescription} />
        <a className={style.download} href={props.poster} download={props.event}>V</a>
    </div>
  )
}

export default Event