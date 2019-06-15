import React from 'react';
import {useState} from 'react';

function Options(){
    const [bd, setBd] = useState("");
    function onBuy(e){
        setBd(e.target.value);
    }
    
    return(
        <div className="options">
            <div></div>
            <div>
            <p>Buy Date</p>
            <input value={bd} onChange={onBuy} type="date"/>
            </div>
            <div>
            <p>Sell Date</p>
            <input type="date"/>
            </div>
        </div>
    )
}

export default Options;