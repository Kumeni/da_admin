import React from 'react'
import style from './MoreActions.module.css'

function MoreActions(props) {

	const handleEdit = () => {
		props.setShowMoreActions(false);
		props.edit();
	}

	const handleDisable = () => {
		props.setShowMoreActions(false);
		props.disable();
	}

	const handleDelete = () => {
		props.setShowMoreActions(false);
		props.delete();
	}
	return (
		<div className={style.container}>
			<button disabled={props.disabled} className ={"text-primary"} onClick={ event => handleEdit(event)}>Edit<span><i className="fa-solid fa-pencil"></i></span></button>
			<button onClick={ event => handleDisable(event)}>{props.disabled?"Enable":"Disable"} <i class="fa-solid fa-toggle-large-on"></i> <i class="fa-solid fa-toggle-off"></i></button>
			<button disabled={props.disabled}className={"text-danger"} onClick={ event => handleDelete(event)}>Delete<i class="fa-solid fa-trash-can"></i></button>
		</div>
	)
}

export default MoreActions