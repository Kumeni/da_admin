import React, {useState, useRef} from 'react'
import style from './Input.module.css'

function Input(props) {

	const [inputType, setInputType] = useState(props.inputType)
	const input = useRef(null);

	const handleVisible = (event) => {
        if(inputType === undefined || inputType == "password"){
            input.current.type = 'text';
            event.target.style.color='blue';
            setInputType("text");
        } else {
			input.current.type = 'password';
            event.target.style.color='black';
            setInputType("password");
        }
    }

	return (
		<span className={style.container}>
			<input 
				ref = {input}
				className = {props.type === "password"?style.inputP:style.input} 
				type = {props.type?props.type:"text"} 
				id = {props.id?props.id:""}
				name = {props.name?props.name:""}
				onChange = { event => props.handleChange(event)}
				required = {props.required?true:null}
				onBlur = { event => {
					props.handleBlur &&
						props.handleBlur(event);
				}}
				value={props.value?props.value:""}
				placeholder={props.placeholder?props.placeholder:null}
			/>
			{
				props.type == "password" &&
					<span className={style.eye} onClick={(event)=>handleVisible(event)}><i className={inputType === "text" ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
			}
		</span>
	)
}

export default Input