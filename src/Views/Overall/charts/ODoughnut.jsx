import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./Ocharts.scss"

const ODoughnutChart = ({title,data,options,isCampus}) => {

  return(
  <div className='ODoughnut'>
    {title?
    <div className='header'>
      <h1 className='title' style={{marginLeft:title==="University Overview"?"6.2rem":null,fontSize:isCampus?"1.4rem":null}}>{title}</h1>
    </div>:null
    }
    <Doughnut 
        data={data} 
        options={options}/>
  </div>
  )
}

export default ODoughnutChart;