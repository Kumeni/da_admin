import React from 'react';
import style from './ContactDetails.module.css';

function ContactDetails(props) {
    return (
        <div className={style.container}>
            <span>
                <img src="/icons/phone-call.PNG" alt="phone" />
                <img src="/icons/whatsapp.PNG" alt="whatsapp" />
            </span>
            <a href={props.contacts? ("tel:"+props.contacts.attributes.phoneNo):undefined}>
                {props.contacts? props.contacts.attributes.phoneNo:undefined}
            </a>
            <span>
                <img src="/icons/gmail.PNG" alt="email" />
            </span>
            <a href={props.contacts? ("mailto:"+props.contacts.attributes.email):undefined}>
                {props.contacts? props.contacts.attributes.email:undefined}
            </a>
            <button onClick ={() => props.handleEdit(true)}>EDIT</button>
        </div>
    )
}

export default ContactDetails