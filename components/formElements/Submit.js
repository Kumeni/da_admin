import React from 'react'
import style from './Submit.module.css'

function Submit(props) {
    return (
        <span className={style.container}>
            <input className={style.submit} type="submit" value={props.value} />
            {
                props.status === "LOADING"?
                        <span className = {style.loading}>
                            <span></span>
                        </span>
                    :props.status === "LOADED"?
                        <span className = {style.loaded}>
                            DONE
                        </span>
                    :undefined
            }
            
            
        </span>
    )
}

export default Submit