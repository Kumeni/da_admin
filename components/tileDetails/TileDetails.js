import React, {useState} from 'react'
import MoreActions from '../moreActions/MoreActions'
import Referrals from '../referrals/Referrals'
import style from './TileDetails.module.css'

function TileDetails(props) {

    const [showMoreActions, setShowMoreActions] = useState(false);

    const handleShowMoreActions = () => {
        console.log(showMoreActions);
        setShowMoreActions(!showMoreActions);
    }

    
    return (
        <div className={style.container}>
            <div>
                <div>
                    <p className={props.disabled && 'text-gray'}>{props.name}</p>
                    {
                        showMoreActions &&
                            <MoreActions 
                                setShowMoreActions = { data => setShowMoreActions(data)}
                                edit = { () => props.edit()}    
                                delete = { () => props.delete()}
                                disable = { () => props.disable()}
                                disabled = {props.disabled}
                            />
                    }
                </div>
                <div onClick = { ()=> handleShowMoreActions()} className={style.more}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={style.content}>
                <Referrals addReferrals={ () => props.addReferrals()} referrals={props.referrals}/>
                {
                    props.children
                }
                {
                    props.disabled &&
                        <div className={style.disabled}></div>
                }
            </div>
            
        </div>
    )
}

export default TileDetails