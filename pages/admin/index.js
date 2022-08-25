import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import React, {useRef, useEffect, useState} from 'react';

import Header from '../../components/Header/Header'
// import Sections from '../../components/sections/Sections';
// import Section from '../../components/sections/Section';
// import Landing from '../../components/landing/Landing';
import SocialMedia from '../../components/socialMedia/SocialMedia';
// import Events from '../../components/events/Events';
// import AvailableRooms from '../../components/availableRooms/AvailableRooms';
import Footer from '../../components/footer/Footer';
import Layout1 from '../../components/layouts/Layout1';
import Hostel from '../../components/hostel/Hostel';
import L1PopUp from '../../components/popups/L1PopUP';
import L2PopUp from '../../components/popups/L2PopUp';
import EditHostel from '../../components/editHostel/EditHostel';
import AddReferrals from '../../components/addReferrals/AddReferrals';
import axios from 'axios';
import {put} from '../../utilities/api'
import Contacts from '../../components/contacts/Contacts';

function Admin(props) {

    const [hostels, setHostels] = useState([]);
    const [addHostel, setAddHostel] = useState(true);
    const [title, setTitle] = useState("Add Hostel");
    const [popup, setPopup] = useState(false);
    const [activeHostel, setActiveHostel] = useState();
    const [contacts, setContacts] = useState();

    
    const addReferrals = (index) => {
        setPopup(true);
        setAddHostel(false);
        setActiveHostel(hostels[index]);
    }

    const handleClick = (status=true) => {
        if(status){
            setPopup(true);
            setAddHostel(true);
		    setTitle("Add Hostel");
        } else {
            setPopup(false);
		    setTitle();
            setActiveHostel();
            setAddHostel(true);
        }
	}

    const hostelEdit = (index) => {
        setPopup(true);
        setAddHostel(true);
        setTitle("Edit Hostel");
        setActiveHostel(hostels[index]);
    }

    const hostelDisable = (index) => {
        let data = {
            disabled:!hostels[index].attributes.disabled,
        };
        put(props.server, ('/api/hostels/'+hostels[index].id), props.authorization.jwt, data)
        .then( res => {
            getHostels();
        })
    }   

    const hostelDelete = (index) =>{
        let data = {
            deleted:true,
        };
        put(props.server, ('/api/hostels/'+hostels[index].id), props.authorization.jwt, data)
        .then( res => {
            getHostels();
        })
    }



    const getHostels = () => {

        const qs = require('qs');
        const query = qs.stringify({
            filters: {
                userId: props.authorization.user.id,
                deleted:false,
            },
            }, {
            encodeValuesOnly: true, // prettify URL
        });

        axios({
            method: 'get',
            url: props.server+'/api/hostels?'+query,
            headers:{
                "Authorization": "Bearer "+props.authorization.jwt,
            },
        })
        .then( res => {
            console.log(res.data.data);
            setHostels(res.data.data.slice());
        })
        .then( err => {
            console.log(err);
        })
    }
    
    const getContacts = () => {
        const qs = require('qs');
        const query = qs.stringify({
            filters: {
                userId: props.authorization.user.id
            },
            }, {
            encodeValuesOnly: true, // prettify URL
        });

        axios({
            method: 'get',
            url: props.server+'/api/contacts?'+query,
            headers:{
                "Authorization": "Bearer "+props.authorization.jwt,
            },
        })
        .then( res => {
            console.log(res.data.data);
            setContacts(res.data.data.slice()[0]);
        })
        .then( err => {
            console.log(err);
        })
    }


    useEffect(()=>{
        if(popup === false){
            getHostels();
            getContacts();
        }
    }, [popup])

    return (
        <div className={styles.container}>
            <Head>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />
                
                <title>Dkut Associates | Hostels, Rentals, Events, Products and Services</title>
                <meta 
                    name="description" 
                    content="
                        On this platform, dedan kimathi students find vacant hostels and other stuff they
                        need to make their lives more easier.
                    "
                />
                <meta name = "theme-color" content = "white" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header 
                authorization = {props.authorization}
            />
            <Layout1 
                title={"My Hostels"}
                addTitle = {"Add Hostel"}
                handleClick = { () => handleClick() }
            >
                {
                    hostels && hostels.map((element, index) => (
                        <Hostel 
                            key = {index} 
                            name = {element.attributes.name}
                            referrals = {element.attributes.referrals}
                            buildings = {element.attributes.buildings}
                            link = {('/admin/hostel?id='+element.id)}
                            disabled={element.attributes.disabled}
                            hostelEdit = { () => hostelEdit(index)}
                            hostelDelete = { () => hostelDelete(index)}
                            hostelDisable = { () => hostelDisable(index)}
                            addReferrals = { () => addReferrals(index)}
                        />
                    ))
                }
            </Layout1>
            
            <SocialMedia />
            <Contacts 
                server = {props.server}
                authorization = {props.authorization}
                contacts = {contacts}
                getContacts = {() => getContacts()}
            />
            <L1PopUp 
                popup={popup}
                handleClick = { data => handleClick(data)}
            >
                {
                    addHostel ?
                        <EditHostel 
                            title={title}
                            authorization = {props.authorization}
                            server = {props.server}
                            handleClick = { data => handleClick(data)}
                            activeHostel={activeHostel}
                        />
                    :
                        <AddReferrals 
                            active = {{hostel:activeHostel}}
                            authorization = {props.authorization}
                            server={props.server}
                            handleClick = { data => handleClick(data)}
                        />
                }
            </L1PopUp>

            {/* <L2PopUp>
                L2PopUP
            </L2PopUp> */}
            <Footer />
        </div>
    )
}

export default Admin