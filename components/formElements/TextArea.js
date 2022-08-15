import React from 'react'
import style from './TextArea.module.css'

function TextArea(props) {
    return (
        <textarea 
            placeholder = {props.placeholder?props.placeholder:null}
            className={style.textarea}
            onChange = { event => props.handleChange(event)}
            value={props.value?props.value:null}
        ></textarea>
    )
}

export default TextArea