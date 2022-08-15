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
import Building from '../../components/building/Building';
import L1PopUp from '../../components/popups/L1PopUP';
import L2PopUp from '../../components/popups/L2PopUp';
import EditBuilding from '../../components/editBuilding/EditBuilding';
import AddReferrals from '../../components/addReferrals/AddReferrals';
import axios from 'axios';
import {put} from '../../utilities/api';
import { useRouter} from 'next/router';

function HostelPage(props) {
    
    const [buildings, setBuildings] = useState([]);
    const [addBuilding, setAddBuilding] = useState(true);
    const [title, setTitle] = useState("Add Building");
    const [popup, setPopup] = useState(false);
    const [activeBuilding, setActiveBuilding] = useState();

    const router = useRouter();

    const addReferrals = (index) => {
        setPopup(true);
        setAddBuilding(false);
        setActiveBuilding(buildings[index]);
    }

    const handleClick = (status=true) => {
        if(status){
            setPopup(true);
            setAddBuilding(true);
		    setTitle("Add Building");
        } else {
            setPopup(false);
		    setTitle();
            setActiveBuilding();
            setAddBuilding(true);
        }
	}

    const buildingEdit = (index) => {
        setPopup(true);
        setAddBuilding(true);
        setTitle("Edit Building");
        setActiveBuilding(buildings[index]);
    }

    const buildingDisable = (index) => {
        let data = {
            disabled:!buildings[index].attributes.disabled,
        };
        put(props.server, ('/api/buildings/'+buildings[index].id), props.authorization.jwt, data)
        .then( res => {
            getBuildings();
        })
    }   

    const buildingDelete = (index) =>{
        let data = {
            deleted:true,
        };
        put(props.server, ('/api/buildings/'+buildings[index].id), props.authorization.jwt, data)
        .then( res => {
            getBuildings();
        })
    }



    const getBuildings = () => {

        const qs = require('qs');
        const query = qs.stringify({
            filters: {
                userId: props.authorization.user.id,
                deleted: false,
                hostelId: router.query.id,
            },
            }, {
            encodeValuesOnly: true, // prettify URL
        }
        );

        axios({
            method: 'get',
            url: props.server+'/api/buildings?'+query,
            headers:{
                "Authorization": "Bearer "+props.authorization.jwt,
            },
        })
        .then( res => {
            console.log(res.data.data);
            setBuildings(res.data.data.slice());
        })
        .then( err => {
            console.log(err);
        })
    }


    useEffect(()=>{
        if(popup === false){
            getBuildings();
        }
    }, [popup])
    
    return (
        <div className={styles.container}>
            <Head>
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
                title={"My Buildings"}
                addTitle = {"Add Building"}
                handleClick = { () => handleClick() }
            >
                {
                    buildings && buildings.map((element, index) => (
                        <Building 
                            key = {index} 
                            name = {element.attributes.name}
                            active = {{hostel:activeBuilding}}
                            link = {('/admin/building?id='+element.id)}
                            disabled={element.attributes.disabled}
                            rooms = {element.attributes.rooms}
                            referrals = {element.attributes.referrals}
                            images = {element.attributes.images}
                            buildingEdit = { () => buildingEdit(index)}
                            buildingDelete = { () => buildingDelete(index)}
                            buildingDisable = { () => buildingDisable(index)}
                            addReferrals = { () => addReferrals(index)}
                            server={props.server}
                        />
                    ))
                }
            </Layout1>
            <SocialMedia />
            <L1PopUp
                popup={popup}
                handleClick = { data => handleClick(data)}
            >
                {
                    addBuilding ?
                        <EditBuilding 
                            title={title}
                            authorization = {props.authorization}
                            server = {props.server}
                            handleClick = { data => handleClick(data)}
                            activeBuilding={activeBuilding}
                        />
                    :
                        <AddReferrals
                            active = {{building:activeBuilding}}
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

export default HostelPage