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
import Layout2 from '../../components/layouts/Layout2';
import Room from '../../components/room/Room';
import L1PopUp from '../../components/popups/L1PopUP';
import L2PopUp from '../../components/popups/L2PopUp';
import EditRoom from '../../components/editRoom/EditRoom';
import AddReferrals from '../../components/addReferrals/AddReferrals';
import axios from 'axios';
import {put, get} from '../../utilities/api';
import { useRouter} from 'next/router';

function BuildingPage(props) {

    const [rooms, setRooms] = useState([]);
    const [popup, setPopup] = useState(false);
    const [title, setTitle] = useState();
    const [addRoom, setAddRoom] = useState(true);
    const [activeRoom, setActiveRoom] = useState();
    const [roomTypes, setRoomTypes] = useState([]);
    const [requiredGenders, setRequiredGenders] = useState([]);

    const router = useRouter();

    const addReferrals = (index) => {
        setPopup(true);
        setAddRoom(false);
        setActiveRoom(rooms[index]);
    }

    const handleClick = (status=true) => {
        if(status){
            setPopup(true);
            setAddRoom(true);
		    setTitle("Add Hostel");
        } else {
            setPopup(false);
		    setTitle();
            setActiveRoom();
            setAddRoom(true);
        }
	}

    const roomEdit = (index) => {
        setPopup(true);
        setAddRoom(true);
        setTitle("Edit Room");
        setActiveRoom(rooms[index]);
    }

    const roomDisable = (index) => {
        let data = {
            disabled:!rooms[index].attributes.disabled,
        };
        put(props.server, ('/api/rooms/'+rooms[index].id), props.authorization.jwt, data)
        .then( res => {
            getRooms();
        })
    }

    const roomDelete = (index) =>{
        let data = {
            deleted:true,
        };
        put(props.server, ('/api/rooms/'+rooms[index].id), props.authorization.jwt, data)
        .then( res => {
            getRooms();
        })
    }

    const getRooms = () => {

        const qs = require('qs');
        const query = qs.stringify({
            filters: {
                userId: props.authorization.user.id,
                deleted: false,
                buildingId: router.query.id,
            },
            }, {
            encodeValuesOnly: true, // prettify URL
        }
        );

        /*axios({
            method: 'get',
            url: props.server+'/api/rooms?'+query,
            headers:{
                "Authorization": "Bearer "+props.authorization.jwt,
            },
        })*/
        get(props.server, '/api/rooms', props.authorization.jwt, query)
        .then( res => {
            //console.log(res.data.data);
            setRooms(res.data.data.slice());
        })
        .then( err => {
            console.log(err);
        })
        get(props.server, '/api/required-genders', props.authorization.jwt)
        .then( res => {
            //console.log(res.data.data);
            setRequiredGenders(res.data.data.slice());
        })
        .then( err => {
            console.log(err);
        })
        get(props.server, '/api/room-types', props.authorization.jwt)
        .then( res => {
            //console.log(res.data.data);
            setRoomTypes(res.data.data.slice());
        })
        .then( err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        if(popup === false){
            getRooms();
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
            <Layout2 
                title={"My Rooms"}
                addTitle = {"Add Room"}
                handleClick = {() => handleClick()}
            >
                {
                    rooms &&
                        rooms.map((element, index) => (
                            <Room 
                                key = {index}
                                name = {element.attributes.roomNo}
                                active = {{room:activeRoom}}
                                disabled = {element.attributes.disabled}
                                referrals = {element.attributes.referrals}
                                images = {element.attributes.images}
                                roomEdit = { () => roomEdit(index)}
                                roomDelete = { () => roomDelete(index)}
                                roomDisable = { () => roomDisable(index)}
                                addReferrals = { () => addReferrals(index)}
                                server={props.server}
                            />
                        ))
                }
            </Layout2>
            <SocialMedia />
            <L1PopUp
                popup={popup}
                handleClick = { data => handleClick(data)}
            >
                {
                    addRoom ?
                        <EditRoom
                            title={title}
                            authorization = {props.authorization}
                            server = {props.server}
                            handleClick = { data => handleClick(data)}
                            activeRoom={activeRoom}
                            roomTypes={roomTypes && roomTypes}
                            requiredGenders={requiredGenders && requiredGenders}
                        />
                    :
                        <AddReferrals
                            active = {{room:activeRoom}}
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

export default BuildingPage