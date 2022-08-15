import React, {useCallback, useState, useEffect} from 'react'
import style from './ImageUpload.module.css'
import {useDropzone} from 'react-dropzone'
import Img from './Img';

function ImageUpload(props) {

    const [selectedImage, setSelectedImage] = useState();
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setSelectedImage(acceptedFiles[0])
    }, [])

    useEffect(()=>{
        if(selectedImage){
            let holder = props.images;
            holder.push(selectedImage);
            props.setImages(holder.slice());
        }
    }, [selectedImage])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const imageURL = (image) => {
		
		if(image.image && image.image.formats)
			if(image.image.formats.small)
				return image.image.formats.small.url;
			else if(image.image.formats.medium)
				return image.image.formats.medium.url;
			else if(image.image.formats.large)
				return image.image.formats.large.url;
			else
				return image.image.url;
	}

    return (
        <div className={style.container}>
            <label>{props.title}<span className={"required"}>*</span></label>
            <div className={style.images}>
                {
                    props.images &&
                        props.images.map( (element, index) => (
                            <div key={index}>
                                {
                                    element.id?
                                        <img src={props.server+imageURL(element)} alt="" />
                                        :<Img file = { element} />
                                }
                                
                                <span onClick={ ()=>props.deleteImage(index)} className={style.remove}>&times;</span>
                            </div>
                    ))
                }
                <div>
                    <div {...getRootProps({className:style.dropzone})}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p><span className={style.add}>+</span><br />Drag 'n' drop room image here, <br />or <br />click to select room image</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload