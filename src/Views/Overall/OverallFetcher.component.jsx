import axios from 'axios';
import React, { useEffect } from 'react';
var _ = require('lodash');
const hostname = 'https://gcgc-dashboard.herokuapp.com'
function OverallFetcher({stream,setData}) {
    useEffect(()=>{
        if(stream.length>0)
        {axios.get(`${hostname}/students/overall/${stream}/`).then(resp=>{
            var responseData = _.get(resp,['data','result'])
            console.log(responseData)
            setData(responseData)
        })}
    })
    return(
        <div>
            I fetch data for overall component
        </div>
    )
}

export default OverallFetcher