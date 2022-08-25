import React, {useState, useEffect} from 'react';
import Radio from '../formElements/Radio';
import Input from '../formElements/Input';
import Checkbox from '../formElements/Checkbox';
import Submit from '../formElements/Submit';
import style from './ContactForm.module.css';
import * as Validator from 'validatorjs';
import {post, put, postFiles} from '../../utilities/api'

function ContactForm(props) {

    const [name, setName] = useState();
    const [nameError, setNameError] = useState();
    const [initial, setInitial] = useState("Mr");
    const [initialId, setInitialId] = useState(1);
    const [initialError, setInitialError] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [phoneNoError, setPhoneNoError] = useState();
    const [whatsapp, setWhatsapp] = useState(true);
    const [whatsappError, setWhatsappError] = useState();
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [formError, setFormError] = useState();
    const [status, setStatus] = useState();

    useEffect(()=>{
        //filling the form with contacts
        if(props.contacts){
            setName(props.contacts.attributes.name);
            if(props.contacts.attributes.initial == 1){
                setInitial("Mr");
                setInitialId(1);
            } else {
                setInitial("Mrs");
                setInitialId(2);
            }
            setPhoneNo(props.contacts.attributes.phoneNo);
            setWhatsapp(props.contacts.attributes.whatsapp);
            setEmail(props.contacts.attributes.email);
        } else {
            setEmail(props.authorization.user.email);
        }
    }, [props.contacts])

    const handleName = event => {
        setName(event.target.value);
        setNameError();
        setFormError();
    }

    const handleInitial = event => {
        event.target.value === "Mr"?
            setInitialId(1)
            :setInitialId(2);
        
        setInitial(event.target.value);
        setInitialError();
        setFormError();
    }

    const handlePhoneNo = event => {
        setPhoneNo(event.target.value);
        setPhoneNoError();
        setFormError();
    }

    const handleWhatsapp = event => {
        setWhatsapp(event.target.checked);
        setWhatsappError();
        setFormError();
    }

    const handleEmail = event => {
        setEmail(event.target.value);
        setEmailError();
        setFormError();
    }

    const handleSubmit = event => {
        event.preventDefault();
        setStatus("LOADING");
        setFormError();

        let validationPassed = true;

        let data = {
            name:name,
            whatsapp:whatsapp,
            email:email,
            initial:initialId,
            phone_number:phoneNo
        }

        let rules = {
            name:"required|string",
            whatsapp:"boolean",
            email:"email",
            initial:"required|numeric",
            phone_number:"required|numeric"
        }

        if(!/^\d{9,12}$/.test(phoneNo)){
            setFormError("Something is wrong in the form");
            setPhoneNoError("Invalid phone number");
            validationPassed = false;
        }

        let validation = new Validator(data, rules);

        if(validation.fails()){
            setFormError("Something is wrong in the form");

            if(validation.errors.get('name').length > 0)
                setNameError(validation.errors.first('name'));
            if(validation.errors.get('whatsapp').length > 0)
                setWhatsappError(validation.errors.first('whatsapp'));
            if(validation.errors.get('email').length > 0)
                setEmailError(validation.errors.first('email'));
            if(validation.errors.get('initial').length > 0)
                setInitialError(validation.errors.first('initial'));
            if(validation.errors.get('phone_number').length > 0)
                setPhoneNoError(validation.errors.first('phone_number'));

            return null;
        }

        if(!validationPassed)
            return null;
        
        // prepare data for posting to the server;
        delete data.phone_number;
        data.phoneNo = phoneNo;
        data.userId = props.authorization.user.id;

        if(props.contacts)
            put(props.server, ('/api/contacts/'+props.contacts.id), props.authorization.jwt, data)
            .then( res => {
                console.log(res);
                setStatus("LOADED");
                setTimeout(()=>{
                    setStatus();
                    props.handleEdit(false);
                }, 500)
            })
            .catch( err => {
                console.log(err);
                setFormError("Something went wrong");
                setStatus();
            })
        else
            post(props.server, '/api/contacts', props.authorization.jwt, data)
            .then( res => {
                console.log(res);
                setStatus("LOADED");
                setTimeout(()=>{
                    setStatus();
                    props.handleEdit(false);
                }, 500)
            })
            .catch( err => {
                console.log(err);
                setFormError("Something went wrong");
                setStatus();
            });
    }
    return (
        <form className={style.form} onSubmit = { event => handleSubmit(event)}>
            <p>Potential tenants will use these contacts to reach you.</p>
            <div>
                <span onClick={() => props.handleEdit(false)} className = {style.close}>&times;</span>
                <span className={style.initials}>
                    <span>
                        <Radio 
                            name={"initial"}
                            id={"mr"}
                            value={"Mr"}
                            checked = {initial === "Mr"}
                            handleChange = {event => handleInitial(event)}
                        />
                        <Radio 
                            name={"initial"}
                            id={"mrs"}
                            value={"Mrs"}
                            checked = {initial === "Mrs"}
                            handleChange = {event => handleInitial(event)}
                        />
                    </span>
                    <span className="error">{initialError}</span>
                </span>
                <span>
                    <Input 
                        type="text"
                        id="name"
                        name="name"
                        handleChange = {event => handleName(event)}
                        placeholder = {"John Doe"}
                        value = {name}
                    />
                    <span className="error">{nameError}</span>
                </span>
                <label>Phone no:</label>
                <span>
                    <Input 
                        type="number"
                        id="phoneNo"
                        name="phoneNo"
                        handleChange = {event => handlePhoneNo(event)}
                        placeholder = {"+254700 000000"}
                        value = {phoneNo}
                    />
                    <span className="error">{phoneNoError}</span>
                </span>
                <span className={style.whatsapp}>
                    <Checkbox 
                        name={"whatsapp"}
                        value={"whatsapp"}
                        handleChange = { event => handleWhatsapp(event)}
                        checked={whatsapp}
                    />
                </span>
                <label>Email:</label>
                <span>
                    <Input 
                        type="email"
                        id="email"
                        name="email"
                        handleChange = {event => handleEmail(event)}
                        placeholder = {"johndoe@gmail.com"}
                        value = {email}
                    />
                    <span className="error">{emailError}</span>
                </span>
                <span className={style.submit}>
                    <Submit 
                        value={props.contacts?"EDIT":"ADD"}
                        status={status}
                    />
                </span>
                <span className="error">{formError}</span>
            </div>
        </form>
    )
}

export default ContactForm