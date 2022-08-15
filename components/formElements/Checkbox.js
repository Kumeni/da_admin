import React from 'react'
import style from './Checkbox.module.css'

function Checkbox(props) {
    return (
        <span className={style.container}>
            <label htmlFor={props.value}>{props.value}</label>
            <input 
                onChange = { event => props.handleChange(event)} 
                type="checkbox" 
                id={props.value} 
                name={props.name} 
                value={props.value} 
                checked={props.checked}
            />
            <span className={style.check}></span>
        </span>
    )
}

export default Checkbox