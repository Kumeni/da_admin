import React from 'react'
import style from './Radio.module.css'

function Radio(props) {

    return (
        <span className={style.container}>
            <input 
                onChange = {event => props.handleChange(event)} 
                type="radio" id={props.value.replace(" ", "")} 
                name={props.name} 
                value={props.value} 
                checked={props.checked}
            />
            <label htmlFor={props.value.replace(" ", "")}>{props.value}</label>
            <span className={style.check}></span>
        </span>
    )
}

export default Radio