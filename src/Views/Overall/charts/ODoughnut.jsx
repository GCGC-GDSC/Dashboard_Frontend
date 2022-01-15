import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./Ocharts.scss"

const ODoughnutChart = ({title,data,options}) => {

  return(
  <div className='ODoughnut'>
    {title?
    <div className='header'>
      <h1 className='title mark'>{title}</h1>
    </div>:null
    }
    <Doughnut 
        data={data} 
        options={options}/>
  </div>
  )
}

export default ODoughnutChart;