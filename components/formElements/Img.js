import React, {useState, useEffect} from 'react'

function Img(props) {

    const [src, setSrc] = useState("");

    useEffect(()=>{
        if(props.file !== undefined){
            let reader = new FileReader();
            reader.readAsDataURL(props.file);
            reader.onload = event => {
                setSrc(event.target.result);
            }
        }
    }, [props.file])
    return (
        <img src={src} />
    )
}

export default Img