import React from 'react';
import "./Logs.styles.scss"
function Logs({logs}){
    return(
        <div className='logs-component'>
            {
            logs.map(log=>
                <div className='Log' dangerouslySetInnerHTML={{__html: log }}>
                </div>    
            )
            }
        </div>
    )
}
export default Logs