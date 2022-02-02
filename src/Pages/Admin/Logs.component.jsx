import React, { useEffect, useState } from 'react';
import axios from "axios"
import "./Logs.styles.scss"
function Logs({logs}){
    return(
        <div className='logs-component'>
            {
            logs.map(log=>
                <div className='Log' dangerouslySetInnerHTML={{__html: log }}>
                    {console.log(log)}
                </div>    
            )
            }
        </div>
    )
}
export default Logs