import React, {useState} from 'react'
import style from './AddReferrals.module.css'
import Input from '../formElements/Input'
import Submit from '../formElements/Submit'
import * as Validator from 'validatorjs'
import {post} from '../../utilities/api'

function AddReferrals(props) {

    const [referrals, setReferrals] = useState();
    const [referralsError, setReferralsError] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [phoneNoError, setPhoneNoError] = useState();
    const [formError, setFormError] = useState();
    const [status, setStatus] = useState();

    const handleReferrals = event => {
        setReferrals(event.target.value);
        setReferralsError();
        setFormError();
    }

    const handlePhoneNo = event => {
        setPhoneNo(event.target.value);
        setPhoneNoError();
        setFormError();
    }

    console.log(props.active);

    const title = () => {
        let {hostel, building, room} = props.active;
        if(hostel)
            return `Add Hostel Referrals`;
        else if(building)
            return `Add Building Referrals`;
        else if(room)
            return `Add Room Referrals`;
        
        return null;
    }

    const addReferrals = event => {
        event.preventDefault();
        // form validation
        // phone number mpesa phone number

        let data = {
            phone_number:phoneNo,
            referrals:referrals,
        },
        rules = {
            phone_number:'required|numeric',
            referrals:'required|numeric'
        }

        let validation = new Validator(data, rules);

        if(validation.fails()){
            setFormError("Something is wrong in the form");

            if(validation.errors.get('phone_number').length > 0)
                setPhoneNoError(validation.errors.first('phone_number'));

            if(validation.errors.get('referrals').length > 0)
                setReferralsError(validation.errors.first('referrals'));

            return null;
        }

        if(!/^\d{9,12}$/.test(phoneNo)){
            setFormError("Something is wrong in the form");
            setPhoneNoError("Invalid phone number");
            return null;
        }

        data = {
            userId:props.authorization.user.id,
            phoneNo:phoneNo,
            referrals:referrals
        }

        if(props.active.hostel)
            data.hostelId = props.active.hostel.id;
        else if(props.active.building)
            data.buildingId = props.active.building.id;
        else if(props.active.room)
            data.roomId = props.active.room.id

        // Make the post request
        post(props.server, '/api/referrals', props.authorization.jwt, data)
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

    const description = () => {
        console.log(props.active);
        let {hostel, building, room} = props.active;
        if(hostel)
            return `These referrals affect all active rooms in ${hostel.attributes.name}`
        else if(building)
            return `These referrals affect all active rooms in ${building.attributes.name}`
        else if(room)
            return `These referrals affects room ${room.attributes.roomNo}`
            
        return null;
    }
    return (
        <div className={style.container}>
            <h2>{title()}</h2>
            <div className={style.underline}></div>
            <p>{description()}.</p>
            <form className={style.form} onSubmit = { event => addReferrals(event)}>
                <div>
                    <label htmlFor="noOfReferrals">Number of referrals</label>
                    <span>
                        <Input 
                            type="number"
                            id="noOfReferrals"
                            name="noOfReferrals"
                            value={referrals}
                            required={true}
                            handleChange = { event => handleReferrals(event)}
                        />
                        <span className="error">{referralsError}</span>
                    </span>
                    <label>Amount</label>
                    <span>Ksh. 1200</span>
                    <label htmlFor="mpesaPhoneNo">Mpesa phone No.</label>
                    <span>
                        <Input 
                            type="number"
                            id="mpesaPhoneNo"
                            name="mpesaPhoneNo"
                            value={phoneNo}
                            required={true}
                            handleChange = { event => handlePhoneNo(event)}
                        />
                        <span className="error">{phoneNoError}</span>
                    </span>
                </div>
                <Submit 
                    status = {status}
                    value={"ADD"}
                />
                <span className="error">{formError}</span>
            </form>
        </div>
    )
}

export default AddReferrals