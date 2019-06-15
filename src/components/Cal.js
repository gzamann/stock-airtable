import React from 'react';
import {useState} from 'react';
import Airtable from 'airtable';

const base = new Airtable({apiKey: 'keyCQeHBrRMkb8kGg'}).base('appIEjO1d0RcTFHPg');

function Cal(props){
    const [value, setValue] = useState("");
    function setVal(e){
        setValue(e.target.value)
    }
    function addRecord(){
        console.log(value)
        base('stocks').create({
            "Date": value,
            "Price": 120
          }, {typecast: true}, function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(record.getId());
          });
    }
    return(
        <div className="cal">
            <Weeks />
        {
            props.data.map((i)=>(
                <Stock className="stockdate" price={i.fields['Price']} date={i.fields['Date']}/>
            ))
        }
        <input value={value} onChange={setVal} type="date"></input>
        <button onClick={addRecord}>Add</button>
        </div>
    )
}
function Stock(props){
    
    return(
        <div className={props.stockdate}>
            {props.price}
        </div>
    )
}
function Weeks(){
    return(
        <React.Fragment>
            <div className="wdays">Monday</div>
            <div className="wdays">Tuesday</div>
            <div className="wdays">Wednesday</div>
            <div className="wdays">Thursday</div>
            <div className="wdays">Friday</div>
            <div className="wdays">Saturday</div>
            <div className="wdays">Sunday</div>
        </React.Fragment>
    )
}
export default Cal;