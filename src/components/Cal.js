import React from 'react';
import {useState} from 'react';
import Airtable from 'airtable';

const base = new Airtable({apiKey: 'keyCQeHBrRMkb8kGg'}).base('appIEjO1d0RcTFHPg');

function Cal(props){

    return(
            <div className="cal">
            <Weeks />
        {props.data.map((i)=>(
                <Stock className="stockdate" 
                price={i.fields['Price']} id={i.id} date={i.fields['Date']}/>
                ))
        }
        </div>
    )
}
function Stock(props){
    const [value, setValue] = useState();
    function setVal(e){
        setValue(e.target.value)
    }
    function addRecord(){
        console.log(props.id,value);
        base('stocks').update(props.id, {
            "Price": parseFloat(value),
          }, function(err) {
            if (err) {
              console.error(err.message);
              return;
            }
          });
    }
    function deleteRecord(){
        base('stocks').replace(props.id, {
          }, function(err, record) {
            if (err) {
              console.error(err.message);
              return;
            }
          });
    }
    return(
        <div className={props.className}>
            <span>
                {props.date}
            </span>
            <span className="stprice">
            {(props.price == undefined)?
            <i className="btnadd" onClick={addRecord}>
                <i className="icon ion-ios-add-circle"></i>
            </i>
            :
            <span>{props.price}</span>
            }
            </span>
            <span>
            <i className="btndel" onClick={deleteRecord}>
                <i className="icon ion-ios-close-circle-outline"></i>
            </i>
            </span>
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