import React from 'react'
import style from './L2PopUp.module.css'

function L2PopUp(props) {
  return (
    <div className={style.container}>{props.children}</div>
  )
}

export default L2PopUp