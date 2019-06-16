import React from 'react';
import {useState} from 'react';

function Cal(props){
    function addRec(id, value,index){
        props.addNewRec(id,value,index);
    }
    function delRec(id,index){
        props.delRecord(id,index);
    }

    return(
            <div className="cal">
            <Weeks />
        {props.data.map((i, index)=>(
            <Stock key={index} i={index} addR={addRec} delRecord={delRec} 
                className="stockdate" 
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
        props.addR(props.id,value,props.i);
        setValue("");
    }
    function deleteRecord(){
        props.delRecord(props.id,props.i);
    }
    return(
        <div className={props.className}>
            <span>
                {props.date}
            </span>
            <span className="stprice">
            {(props.price == undefined)?
            <React.Fragment>
            <input maxLength="3" value={value} onChange={setVal}/>
            <br/>
            <i className="btnadd" onClick={addRecord}>
                <i className="icon ion-ios-add-circle"></i>
            </i>
            </React.Fragment>
            :
            <span>{props.price}</span>
            }
            </span>
            <span>
            {
            (props.price !== undefined)?
            <i className="btndel" onClick={deleteRecord}>
                <i className="icon ion-ios-close-circle-outline"></i>
            </i>
            :
            <i></i>
            }
            </span>
        </div>
    )
}
function Weeks(){
    return(
        <React.Fragment>
            <div className="wdays">Sunday</div>
            <div className="wdays">Monday</div>
            <div className="wdays">Tuesday</div>
            <div className="wdays">Wednesday</div>
            <div className="wdays">Thursday</div>
            <div className="wdays">Friday</div>
            <div className="wdays">Saturday</div>
        </React.Fragment>
    )
}
export default Cal;