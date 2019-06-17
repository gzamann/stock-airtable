import React from 'react'
import {useState} from 'react'

export default function Options(props){

    const [bd, setBd] = useState("");
    const [sd, setSd] = useState("");
    const [stocknum, setStocknum] = useState("1");

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
        if(sd>bd){
            let maxProf;
            let buyPrice;
            let sellPrice;
            function chk(){props.data.forEach((r)=>
        {
            if(r.fields.Date===parseFloat(bd)){
                console.log(bd,r.fields.Price);
                buyPrice = r.fields.Price
            }else if(r.fields.Date===parseFloat(sd)){
                console.log(sd,r.fields.Price)
                sellPrice = r.fields.Price;
            }
        })}
        chk();
        maxProf = (sellPrice *stocknum) - (buyPrice * stocknum);
        console.log("Check the max profit",maxProf);
        setBd("");
        setSd("");
        setStocknum("1");
        props.getProfit(maxProf);
    }
    else if(sd<bd){
        let maxProf="sell date can not be before buy date";
        props.getProfit(maxProf);
    }else{
        let maxProf="Please enter values";
        props.getProfit(maxProf);
    }
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
                <input value={stocknum}  onChange={Stocknum}/>
            </div>
            <div>
                <abbr title="Enter">
                <i className="icon ion-ios-calculator" onClick={checkProfit}></i>
                </abbr>
            </div>
        </div>
    )
}