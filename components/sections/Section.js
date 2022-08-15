import React from 'react'
import style from './Section.module.css'

function Section(props) {
  return (
    <div className={style.section} id={props.id?props.id:""}>{props.children}</div>
  )
}

export default Section