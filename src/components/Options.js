import React from 'react';
import {useState} from 'react';

function Options(){
    const [bd, setBd] = useState("");
    const [sd, setSd] = useState("");
    const [stocknum, setStocknum] = useState("");

    function Stocknum(e){
        setStocknum(e.target.value);
    }
    function setBuy(e){
        setBd(e.target.value);
    }
    function setSell(e){
        setSd(e.target.value);
    }
    function checkProfit(){
        console.log("Check the max profit");
    }
    return(
        <div className="options">
            <div>
                <p>Buy Date</p>
                <i className="icon ion-ios-calendar" />
                <input value={bd} onChange={setBuy}/>
            </div>
            <div>
                <p>Sell Date</p>
                <i className="icon ion-ios-calendar" />
                <input value={sd} onChange={setSell}/>
            </div>
            <div>
                <p>How many?</p>
                <i className="icon ion-ios-cart"/>
                <input value={stocknum} onChange={Stocknum}/>
            </div>
            <div>
                <i className="icon ion-ios-calculator" onClick={checkProfit}></i>
            </div>
        </div>
    )
}

export default Options;