import React, {useState, useEffect} from 'react';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import style from './Contacts.module.css';

function Contacts(props) {

    const [edit, setEdit] = useState(props.contacts && false);

    const handleEdit = data => {
        setEdit(data);
        if(!data)
            props.getContacts();
    }


    return (
        <div className={style.container}>
            <h1>Contacts</h1>
            {
                edit?
                    <ContactForm 
                        server = {props.server}
                        authorization = {props.authorization}
                        contacts = {props.contacts}
                        handleEdit = {data => handleEdit(data)}
                    />
                    :<ContactDetails 
                        contacts = {props.contacts}
                        handleEdit = {data => handleEdit(data)}
                    />
            }
        </div>
    )
}

export default Contacts