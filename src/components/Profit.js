import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'

export default function Profit(props){
    const [classN, setClassN] = useState('hasprofit')

    useEffect(() => {
        if (parseFloat(props.profit)<0){
                setClassN("haslose")
            }
    },[props.profit])

    return(
        <div className="profit">
            <h2>Max Profit</h2>
            {
            props.profit ?
            <h3 className={classN}>$ {props.profit}</h3>:
            <p>Use the profit calculator</p>
            }
        </div>
    )
}