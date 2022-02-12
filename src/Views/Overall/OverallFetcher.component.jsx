import axios from 'axios';
import React, { useContext,useEffect } from 'react';
import { UserContext } from "../../context/context";

var _ = require('lodash');
const hostname = 'https://gcgc-dashboard.herokuapp.com'
function OverallFetcher({stream,setData}) {
const user = useContext(UserContext);

    useEffect(()=>{
        if(stream.length>0)
        {axios.get(`${hostname}/students/overall/${stream}/`,{
            headers: {
              'Authorization': `Token ${user.user.token.key}`
            }
          }).then(resp=>{
            var responseData = _.get(resp,['data','result'])
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