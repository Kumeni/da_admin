import React, {useEffect, useState} from 'react'
import style from './EditHostel.module.css'
import Input from '../formElements/Input'
import Submit from '../formElements/Submit'
import * as Validator from 'validatorjs'
import axios from 'axios'
import {post, put} from '../../utilities/api'

function EditHostel(props) {

    const [hostelName, setHostelName] = useState();
    const [hostelNameError, setHostelNameError] = useState();
    const [formError, setFormError] = useState();
    const [status, setStatus] = useState();

    useEffect(()=>{
        if(props.activeHostel)
            setHostelName(props.activeHostel.attributes.name);
        
    }, [props.activeHostel])

    const handleHostelName = event => {
        setHostelName(event.target.value);
        setHostelNameError("");
        setFormError("");
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setStatus("LOADING");

        let data = {
            hostel_name:hostelName,
        }

        let rules = {
            hostel_name:'required|string',
        }

        let validation = new Validator(data, rules);

        if(validation.fails()){
            setFormError("Something is wrong in the form");

            if(validation.errors.get('hostel_name').length > 0)
                setHostelNameError(validation.errors.first('hostel_name'));

            return null;
        }

        // Organize the data for making post or put request
        if(props.activeHostel){

            data = {
                name: hostelName,
            }

            put(props.server, ('/api/hostels/'+props.activeHostel.id), props.authorization.jwt, data)
            .then( res => {
                setStatus("LOADED");
                setTimeout(()=>{
                    setStatus();
                    props.handleClick(false);
                }, 500)
            })
            .catch( err =>{
                console.log(err);
            })
        } else {

            data = {
                name: hostelName,
                userId: props.authorization.user.id,
            }

            post(props.server, '/api/hostels', props.authorization.jwt, data)
            .then( res => {
                setStatus("LOADED");
                setTimeout(()=>{
                    setStatus();
                    props.handleClick(false);
                }, 500)
            })
            .catch( err =>{
                console.log(err);
            })
        }
    }

    return (
        <div className={style.container}>
            <h2>{props.title}</h2>
            <div className={style.underline}></div>
            <form className={style.form} onSubmit = { event => handleSubmit(event)}>
                <div>
                    <label htmlFor="hostelName">Hostel name<span className={"required"}>*</span></label>
                    <span>
                        <Input 
                            type="text"
                            id="hostelName"
                            name="hostelName"
                            handleChange = { event => handleHostelName(event)}
                            value={hostelName}
                        />
                        <span className="error">{hostelNameError}</span>
                    </span>
                </div>
                <Submit 
                    value={props.activeHostel?"EDIT":"ADD"}
                    status = {status}
                />
                <span className="error">{formError}</span>
            </form>
        </div>
    )
}

export default EditHostel