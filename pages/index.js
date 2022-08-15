import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, {useRef, useEffect, useState} from 'react';

import Header from '../components/Header/Header'
import Sections from '../components/sections/Sections';
import Section from '../components/sections/Section';
import Landing from '../components/landing/Landing';
import SocialMedia from '../components/socialMedia/SocialMedia';
import Events from '../components/events/Events';
import AvailableRooms from '../components/availableRooms/AvailableRooms';
import Footer from '../components/footer/Footer';

export default function Home(props) {

	const landing = useRef(null);
	const header = useRef(null);
	const [landingContent, setLandingContent] = useState()

	const [height, setHeight] = useState();


	useEffect(()=>{
		console.log(landingContent);
	}, [landingContent])

	const handleLandingHeight = () => {
		if(landing.current !== null && header.current !== null){
			let windowHeight = window.innerHeight, headerHeight = header.current.getBoundingClientRect().height;
			//console.log((windowHeight - headerHeight)+1 + "px");
			landing.current.style.height = (windowHeight - headerHeight)+1 + "px";
			setHeight((windowHeight - headerHeight)+1 + "px");
		}
	}

	useEffect(()=>{
		if(landing.current !== null && header.current !== null){
			handleLandingHeight();
			
			document.addEventListener( "load", event => {
				handleLandingHeight();
			})
			window.addEventListener( "resize", event => {
				handleLandingHeight();
			})
		}
	}, [landing, header])

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

			<Header />
			<Sections>
				<Section>
					<Landing />
				</Section>
				<Section id="upcoming-events">
					<Events />
				</Section>
				<Section>
					<AvailableRooms />
				</Section>
			</Sections>
			<SocialMedia />
			<Footer />
		</div>
	)
}
