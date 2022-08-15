import React, {useState, useEffect} from 'react'
import style from './EditBuilding.module.css'
import ImageUpload from '../formElements/ImageUpload'
import Input from '../formElements/Input'
import TextArea from '../formElements/TextArea'
import Submit from '../formElements/Submit'
import * as Validator from 'validatorjs'
import axios from 'axios'
import {post, put, postFiles} from '../../utilities/api'
import {useRouter} from 'next/router'

function EditBuilding(props) {

    const [images, setImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [imagesError, setImagesError] = useState("");
    const [buildingName, setBuildingName] = useState();
    const [buildingNameError, setBuildingNameError] = useState("");
    const [location ,setLocation] = useState();
    const [locationError, setLocationError] = useState("");
    const [mapsLink, setMapsLink] = useState();
    const [mapsLinkError, setMapsLinkError] = useState("");
    const [additionalDescription, setAdditionalDescription] = useState();
    const [additionalDescriptionError, setAdditionalDescriptionError] = useState("");
    const [formError, setFormError] = useState("");
    const [status, setStatus] = useState();

    const router = useRouter();

    useEffect(()=>{

        // Pre-filling building info for editing.
        if(props.activeBuilding){
            setBuildingName(props.activeBuilding.attributes.name);
            setLocation(props.activeBuilding.attributes.location);
            setMapsLink(props.activeBuilding.attributes.mapsLink);
            setAdditionalDescription(props.activeBuilding.attributes.fromTenant);

            let container = [].concat(props.activeBuilding.attributes.images);
            setImages(container.slice());
        }
    }, [props.activeBuilding])

    const handleBuildingName = event => {
        setBuildingName(event.target.value);
        setBuildingNameError("");
        setFormError("");
    }

    const handleLocation = event => {
        setLocation(event.target.value);
        setLocationError("");
        setFormError("");
    }

    const handleMapsLink = event => {
        setMapsLink(event.target.value);
        setMapsLinkError("");
        setFormError("");
    }

    const handleAdditionalDescription = event => {
        setAdditionalDescription(event.target.value);
        setAdditionalDescriptionError("");
        setFormError("");
    }

    const deleteImage = index => {
        let initialImages = images, deletedImage, container = imagesToDelete;
        index === (images.length-1)?
            deletedImage = initialImages.splice(index,)[0]
            :deletedImage = initialImages.splice(index, index++)[0]
        
        setImages(initialImages.slice());

        if(deletedImage && deletedImage.id){
            container.push(deletedImage);
            setImagesToDelete(container.slice());
        }
    }

    useEffect(() => {
        if(images && images.length >= 2)
            setImagesError("");
    }, [images])

    const handleSubmit = async event => {
        event.preventDefault();
        setStatus("LOADING");
        
        // form validation
        // show error message below the submit button
        // show error message below the component

        // prepare the data for sending to the server
        // stop there.

        //validating images at least two
        let validationPassed = true;
        if(images.length < 2){
            validationPassed = false;
            setImagesError("At least two room images are required");
        }

        let data = {
            building_name:buildingName,
            location:location,
            google_maps_link:mapsLink,
            additional_description:additionalDescription
        }

        let rules = {
            building_name:'required|string',
            location:'required|string',
            google_maps_link:'string',
            additional_description:'string'
        }

        let validation = new Validator(data, rules);

        if(validation.fails()){
            setFormError("Something is wrong in the form");

            if(validation.errors.get('building_name').length > 0)
                setBuildingNameError(validation.errors.first('building_name'));
            if(validation.errors.get('location').length > 0)
                setLocationError(validation.errors.first('location'));
            if(validation.errors.get('google_maps_link').length > 0)
                setMapsLinkError(validation.errors.first('google_maps_link'));
            if(validation.errors.get('additional_description').length > 0)
                setAdditionalDescriptionError(validation.errors.first('additional_description'));
            

            return null;
        }

        if(!validationPassed)
            return null;

        // Organize the data for making post or put request
        // All images must be sent separately with appropriate form data
        // The body will be sent separately but first
        // We got one shot at this

        data = {
            name:buildingName,
            userId: props.authorization.user.id,
            hostelId:router.query.id,
            fromTenant:additionalDescription,
            location:location,
            mapsLink:mapsLink
        }

        if(props.activeBuilding){
            put(props.server, ('/api/buildings/'+props.activeBuilding.id), props.authorization.jwt, data)
            .then( async res => {
                // uploading product images

                let formData, i;

                if(imagesToDelete.length > 0){
                    data = {
                        deleted: true,
                    };
                    for( i = 0; i < imagesToDelete.length; i++){
                        console.log(imagesToDelete[i]);
                        await put(props.server, ('/api/images/'+imagesToDelete[i].id), props.authorization.jwt, data)
                        .then( res => {
                            console.log(res);
                        })
                        .catch( err =>{
                             console.log(err);
                        })
                    }
                }

                for( i =0; i < images.length; i++){
                    data = {
                        userId:props.authorization.user.id,
                        buildingId:res.data.data.id,
                    }

                    if(images[i].id)
                        continue;

                    await post(props.server, '/api/images', props.authorization.jwt, data)
                    .then( async res => {
                        formData = new FormData();

                        //formData.append("data", JSON.stringify(data));
                        formData.append("files", images[i]);
                        formData.append('ref', 'api::image.image')
                        formData.append('refId', res.data.data.id);
                        formData.append('field', 'image');

                            await postFiles(props.server, "/api/upload", formData, props.authorization.jwt)
                            .then( res => {
                                console.log(res.data.data);
                                setBuildings(res.data.data.slice());
                            })
                            .catch( err => {
                                console.log(err);
                                console.log(err.response);
                            })
                    })
                }

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
                post(props.server, '/api/buildings', props.authorization.jwt, data)
                .then( async res => {
                    // uploading product images

                    let formData, i;

                    if(imagesToDelete.length > 0){
                        data = {
                            deleted: true,
                        };
                        for( i = 0; i < imagesToDelete.length; i++){
                            console.log(imagesToDelete[i]);
                            await put(props.server, ('/api/images/'+imagesToDelete[i].id), props.authorization.jwt, data)
                            .then( res => {
                                console.log(res);
                            })
                            .catch( err =>{
                                 console.log(err);
                            })
                        }
                    }

                    for( i =0; i < images.length; i++){
                        data = {
                            userId:props.authorization.user.id,
                            buildingId:res.data.data.id,
                        }

                        if(images[i].id)
                            continue;

                        await post(props.server, '/api/images', props.authorization.jwt, data)
                        .then( async res => {
                            formData = new FormData();

                            //formData.append("data", JSON.stringify(data));
                            formData.append("files", images[i]);
                            formData.append('ref', 'api::image.image')
                            formData.append('refId', res.data.data.id);
                            formData.append('field', 'image');

                                await postFiles(props.server, "/api/upload", formData, props.authorization.jwt)
                                .then( res => {
                                    console.log(res.data.data);
                                    setBuildings(res.data.data.slice());
                                })
                                .catch( err => {
                                    console.log(err);
                                    console.log(err.response);
                                })
                        })
                    }

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
            <span>
                <ImageUpload 
                    images = {images}
                    setImages = { data => setImages(data)}
                    deleteImage = {data => deleteImage(data)}
                    title={"Building images"}
                    server={props.server}
                />
                <span className="error">{imagesError}</span>
            </span>
            <form className={style.form} onSubmit = { event => handleSubmit(event)}>
                <div>
                    <label htmlFor="roomNo">Building name<span className={"required"}>*</span></label>
                    <span>
                        <Input 
                            type="text"
                            id="buildingName"
                            name="buildingName"
                            handleChange = { event => handleBuildingName(event)}
                            placeholder = {"Block A"}
                            value = {buildingName}
                        />
                        <span className="error">{buildingNameError}</span>
                    </span>
                    <label htmlFor="roomNo">Location<span className={"required"}>*</span></label>
                    <span>
                        <Input 
                            type="text"
                            id="location"
                            name="location"
                            handleChange = { event => handleLocation(event)}
                            placeholder = "Kahawa Estate opposite Kings and Queens hostel"
                            value = {location}
                        />
                        <span className="error">{locationError}</span>
                    </span>
                    <label htmlFor="roomNo">Google maps link</label>
                    <span>
                        <Input 
                            type="text"
                            id="mapsLink"
                            name="mapsLink"
                            handleChange = { event => handleMapsLink(event)}
                            placeholder = {"https://goo.gl/maps/M5DK3J9MJwaCpgUi8"}
                            value = {mapsLink}
                        />
                        <span className="error">{mapsLinkError}</span>
                    </span>
                    <label htmlFor="">Additional description</label>
                    <span>
                        <TextArea 
                            handleChange = { event => handleAdditionalDescription(event)}
                            placehoder = {"Additional information such as security, shared facilities, beds, tables etc"}
                            value = {additionalDescription}
                        />
                        <span className="error">{additionalDescriptionError}</span>
                    </span>
                </div>
                <Submit 
                    value={props.activeBuilding?"EDIT":"ADD"}
                    status = {status}
                />
                <span className="error">{formError}</span>
            </form>
        </div>
    )
}

export default EditBuilding