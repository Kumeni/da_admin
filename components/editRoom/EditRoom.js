import React, {useEffect, useState} from 'react'
import ImageUpload from '../formElements/ImageUpload'
import style from './EditRoom.module.css'
import Input from '../formElements/Input'
import Checkbox from '../formElements/Checkbox'
import Radio from '../formElements/Radio'
import TextArea from '../formElements/TextArea'
import Submit from '../formElements/Submit'
import * as Validator from 'validatorjs'
import {post, put, postFiles} from '../../utilities/api'
import {useRouter} from 'next/router'

function EditRoom(props) {

    const [images, setImages] = useState([]);
    const [imagesError, setImagesError] = useState();
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [roomNo, setRoomNo] = useState();
    const [roomNoError, setRoomNoError] = useState();
    const [roomType, setRoomType] = useState();
    const [roomTypeId, setRoomTypeId] = useState();
    const [roomTypeError, setRoomTypeError] = useState();
    const [requiredGender, setRequiredGender] = useState();
    const [requiredGenderId, setRequiredGenderId] = useState();
    const [requiredGenderError, setRequiredGenderError] = useState();
    const [canSA, setCanSA] = useState(false);
    const [SARent, setSARent] = useState();
    const [SARentError, setSARentError] = useState();
    const [SADeposit, setSADeposit] = useState();
    const [SADepositError, setSADepositError] = useState();
    const [canWR, setCanWR] = useState(false);
    const [WRRent, setWRRent] = useState();
    const [WRRentError, setWRRentError] = useState();
    const [rentError, setRentError] = useState("");
    const [WRDeposit, setWRDeposit] = useState();
    const [WRDepositError, setWRDepositError] = useState();
    const [water, setWater] = useState(false);
    const [electricity, setElectricity] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [rentInclusivesError, setRentInclusivesError] = useState();
    const [additionalDescription, setAdditionalDescription] = useState(null);
    const [additionalDescriptionError, setAdditionalDescriptionError] = useState();
    const [formError, setFormError] = useState("");
    const [status, setStatus] = useState();

    const router = useRouter();

    useEffect(()=>{
        // pre-filling room for editing
        if(props.activeRoom && props.roomTypes && props.requiredGenders){
            
            props.roomTypes.map( (element, index) => {
                if(element.id == props.activeRoom.attributes.roomTypeId){
                    setRoomType(element.attributes.name);
                    setRoomTypeId(element.id)
                }
            })
            props.requiredGenders.map( (element, index) => {
                if(element.id == props.activeRoom.attributes.requiredGenderId){
                    setRequiredGender(element.attributes.gender);
                    setRequiredGenderId(element.id);
                }
            })
            
            let container = [].concat(props.activeRoom.attributes.images);
            setImages(container.slice());

            if(props.activeRoom.attributes.SARent){
                setCanSA(true);
                setSARent(props.activeRoom.attributes.SARent);
                if(props.activeRoom.attributes.SADeposit)
                    setSADeposit(props.activeRoom.attributes.SADeposit);
            }

            if(props.activeRoom.attributes.WRRent){
                setCanWR(true);
                setWRRent(props.activeRoom.attributes.WRRent);
                if(props.activeRoom.attributes.WRDeposit)
                    setWRDeposit(props.activeRoom.attributes.WRDeposit);
            }

            setRoomNo(props.activeRoom.attributes.roomNo);
            setWater(props.activeRoom.attributes.water)
            setElectricity(props.activeRoom.attributes.electricity);
            setWifi(props.activeRoom.attributes.wifi);
            setAdditionalDescription(props.activeRoom.attributes.fromLandlord);
        }
    }, [props.activeRoom, props.roomTypes, props.requiredGenders])
    const handleRoomNo = event => {
        setRoomNo(event.target.value);
        setRoomNoError("");
        setFormError("");
    }

    const handleRoomType = (event, id) => {
        console.log(event.target.value);
        setRoomType(event.target.value);
        setRoomTypeId(id);
        setRoomTypeError("");
        setFormError("");
    }

    const handleRequiredGender = (event, id) => {
        console.log(event.target.value);
        setRequiredGender(event.target.value);
        setRequiredGenderId(id)
        setRequiredGenderError("");
        setFormError("");
    }

    const handleCanSA = event => {
        setCanSA(event.target.checked);
        setRentError("");
    }

    const handleCanWR = event => {
        setCanWR(event.target.checked);
        setRentError("");
    }

    const handleSARent = event => {
        setSARent(event.target.value);
        setSARentError("");
        setFormError("");
    }

    const handleSADeposit = event => {
        setSADeposit(event.target.value);
        setSADepositError("");
        setFormError("");
    }

    const handleWRRent = event => {
        setWRRent(event.target.value);
        setWRRentError("");
        setFormError("");
    }

    const handleWRDeposit = event => {
        setWRDeposit(event.target.value);
        setWRDepositError("");
        setFormError("");
    }

    const handleWater = event => {
        setWater(event.target.checked);
        setRentInclusivesError("");
        setFormError("");
    }

    const handleElectricity = event => {
        setElectricity(event.target.checked);
        setRentInclusivesError("");
        setFormError("");
    }

    const handleWIFI = event => {
        setWifi(event.target.checked);
        setRentInclusivesError("");
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

    const handleSubmit = event => {
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
            room_no:roomNo,
            room_type:roomTypeId,
            required_gender:requiredGenderId,
            additional_description:additionalDescription
        }

        let rules = {
            room_no:'required|string',
            room_type:'required|numeric',
            required_gender:'required|numeric',
            additional_description:'string'
        }

        if(!canSA && !canWR){
            setRentError("Rent field is required");
            validationPassed = false;
        }

        if(canSA){
            data.stay_alone_rent = SARent;
            data.stay_alone_deposit = SADeposit;
            rules.stay_alone_rent = 'required|numeric';
            rules.stay_alone_deposit ='numeric';
        }

        if(canWR){
            data.stay_with_roommate_rent = WRRent;
            data.stay_with_roommate_deposit = WRDeposit;
            rules.stay_with_roommate_rent = 'required|numeric';
            rules.stay_with_roommate_deposit = 'numeric';
        }
        //validation for water electricity and wifi remaining

        let validation = new Validator(data, rules);

        if(validation.fails()){
            setFormError("Something is wrong in the form");

            if(validation.errors.get('room_no').length > 0)
                setRoomNoError(validation.errors.first('room_no'));
            if(validation.errors.get('room_type').length > 0)
                setRoomTypeError(validation.errors.first('room_type'));
            if(validation.errors.get('required_gender').length > 0)
                setRequiredGenderError(validation.errors.first('required_gender'));
            if(validation.errors.get('additional_description').length > 0)
                setAdditionalDescriptionError(validation.errors.first('additional_description'));

            if(canSA){
                if(validation.errors.get('stay_alone_rent').length > 0)
                    setSARentError(validation.errors.first('stay_alone_rent'));
                if(validation.errors.get('stay_alone_deposit').length > 0)
                    setSADepositError(validation.errors.first('stay_alone_deposit'));
            }

            if(canWR){
                if(validation.errors.get('stay_with_roommate_rent').length > 0)
                    setWRRentError(validation.errors.first('stay_with_roommate_rent'));
                if(validation.errors.get('stay_with_roommate_deposit').length > 0)
                    setWRDepositError(validation.errors.first('stay_with_roommate_deposit'));
            }

            return null;
        }

        if(!validationPassed)
            return null;

        // Organize the data for making post or put request
        data = {
            buildingId:router.query.id,
            fromLandlord:additionalDescription,
            requiredGenderId:requiredGenderId,
            roomNo:roomNo,
            roomTypeId:roomTypeId,
            userId:props.authorization.user.id,
            water:water,
            electricity:electricity,
            wifi:wifi,
        }

        if (canSA){
            data.SARent = SARent;
            if(SADeposit)
                data.SADeposit = SADeposit;
        } else {
            data.SARent = null;
            data.SADeposit = null;
        }

        if(canWR){
            data.WRRent = WRRent;
            if(WRDeposit)
                data.WRDeposit = WRDeposit;
        } else {
            data.WRRent = null;
            data.WRDeposit = null;
        }

        if(props.activeRoom){
            put(props.server, ('/api/rooms/'+props.activeRoom.id), props.authorization.jwt, data)
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
                        roomId:res.data.data.id,
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
                                setRooms(res.data.data.slice());
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
                console.log(data);
                post(props.server, '/api/rooms', props.authorization.jwt, data)
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
                            roomId:res.data.data.id,
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
                                    setRooms(res.data.data.slice());
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
                    console.log(err.response);
                })
            }

    }

    return (
        <div className={style.container}>
            <h2>{props.title}</h2>
            <div className={style.underline}></div>
            <div>
                <ImageUpload 
                    images = { images}
                    setImages = { data => setImages(data)}
                    deleteImage = { data => deleteImage(data)}
                    title = {"Room images"}
                    server={props.server && props.server}
                />
                <span className="error">{imagesError}</span>
            </div>
            <form onSubmit = { event => handleSubmit(event)} className={style.form}>
                <div>
                    <label htmlFor="roomNo">Room No.<span className={"required"}>*</span></label>
                    <span>
                        <Input 
                            type="text"
                            id="roomNo"
                            name="roomNo"
                            handleChange = {event => handleRoomNo(event)}
                            placeholder = {"A6"}
                            value = {roomNo}
                        />
                        <span className="error">{roomNoError}</span>
                    </span>
                    <label htmlFor="roomType">Room type<span className={"required"}>*</span></label>
                    <span>
                        <div>
                            {
                                props.roomTypes && props.roomTypes.map( (element, index) => (
                                    <Radio 
                                        key = {index}
                                        name="roomType"
                                        id={element.id}
                                        value={element.attributes.name}
                                        checked = {roomType === element.attributes.name}
                                        handleChange = {event => handleRoomType(event, element.id)}
                                    />
                                ))
                            }
                        </div>
                        <span className="error">{roomTypeError}</span>
                    </span>
                    <label htmlFor="requiredGender">Required gender<span className={"required"}>*</span></label>
                    <span>
                        <div>
                            {
                                props.requiredGenders && props.requiredGenders.map( (element, index) => (
                                    <Radio 
                                        key = {index}
                                        name="requiredGender"
                                        id={element.id}
                                        value={element.attributes.gender}
                                        checked={requiredGender === element.attributes.gender}
                                        handleChange={event => handleRequiredGender(event, element.id)}
                                    />
                                ))
                            }
                        </div>
                        <span className="error">{requiredGenderError}</span>
                    </span>
                </div>
                <div className={style.rent}>
                    <label>Rent<span className={"required"}>*</span></label>
                    <div>
                        <span>
                            {/* <label htmlFor={"stayAlone"}>Stay Alone</label> */}
                            <Checkbox
                                // id={"stayAlone"}
                                name={"stayAlone"}
                                value={"Stay alone"}
                                handleChange = { event => handleCanSA(event)}
                                checked={canSA}
                            />
                        </span>
                        {
                            canSA &&
                                <div>
                                    <label htmlFor={"rentStayAlone"}>Rent (Ksh)<span className={"required"}>*</span></label>
                                    <span>
                                        <Input 
                                            id={"rentStayAlone"}
                                            type={"number"}
                                            handleChange = { event => handleSARent(event)}
                                            placeholder={"5000"}
                                            value={SARent}
                                        />
                                        <span className="error">{SARentError}</span>
                                    </span>
                                    <label htmlFor={"depositStayAlone"}>Deposit (Ksh)</label>
                                    <span>
                                        <Input 
                                            id={"depositStayAlone"}
                                            type={"number"}
                                            handleChange = { event => handleSADeposit(event)}
                                            placeholder={"5000"}
                                            value={SADeposit}
                                        />
                                        <span className="error">{SADepositError}</span>
                                    </span>
                                </div>
                        }
                        
                    </div>
                    <div>
                        <span>
                            {/* <label htmlFor={"stayWithRoomate"}>Stay with roommate</label> */}
                            <Checkbox
                                // id={"stayWithRoomate"}
                                name={"stayWithRoomate"}
                                value={"Stay with roommate"}
                                handleChange = { event => handleCanWR(event)}
                                checked={canWR}
                            />
                        </span>
                        {
                            canWR &&
                                <div>
                                    <label htmlFor={"rentStayWithRoomate"}>Rent (Ksh)<span className={"required"}>*</span></label>
                                    <span>
                                        <Input 
                                            id={"rentStayWithRoomate"}
                                            type={"number"}
                                            handleChange = { event => handleWRRent(event)}
                                            placeholder={"2500"}
                                            value={WRRent}
                                        />
                                        <span className="error">{WRRentError}</span>
                                    </span>
                                    <label htmlFor={"depositStayWithRoomate"}>Deposit (Ksh)</label>
                                    <span>
                                        <Input 
                                            id={"depositStayWithRoomate"}
                                            type={"number"}
                                            handleChange = { event => handleWRDeposit(event)}
                                            placeholder={"2500"}
                                            value={WRDeposit}
                                        />
                                        <span className="error">{WRDepositError}</span>
                                    </span>
                                </div>
                        }
                        
                    </div>
                </div>
                <div className={style.rentInclusives}>
                    <label htmlFor="rentInclusives">Rent inclusives<span className={"required"}>*</span></label>
                    <span>
                        <div>
                            <Checkbox
                                // id={"rentInclusives"}
                                name={"rentInclusives"}
                                value={"Water"}
                                handleChange = { event => handleWater(event)}
                                checked={water}
                            />
                            <Checkbox
                                // id={"rentInclusives"}
                                name={"rentInclusives"}
                                value={"Electricity"}
                                handleChange = { event => handleElectricity(event)}
                                checked={electricity}
                            />
                            <Checkbox
                                // id={"rentInclusives"}
                                name={"rentInclusives"}
                                value={"WiFi"}
                                handleChange = { event => handleWIFI(event)}
                                checked={wifi}
                            />
                        </div>
                        <span className="error">{rentInclusivesError}</span>
                    </span>
                </div>
                <div>
                    <label htmlFor="">Additional description</label>
                    <span>
                        <TextArea 
                            handleChange = { event => handleAdditionalDescription(event)}
                            placehoder = {"Additional information such as security, shared facilities, beds, tables etc"}
                            value={additionalDescription}
                        />
                        <span className="error">{additionalDescriptionError}</span>
                    </span>
                </div>
                <Submit 
                    value={props.activeRoom?"EDIT":"ADD"}
                    status={status}
                />
                <span className="error">{formError}</span>
            </form>
        </div>
    )
}

export default EditRoom