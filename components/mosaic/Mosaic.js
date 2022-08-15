import React from 'react'
import style from './Mosaic.module.css'

function Mosaic(props) {
  return (
    <div className={style.mosaic}>{props.children}</div>
  )
}

export default Mosaic