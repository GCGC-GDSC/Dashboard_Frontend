import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ODoughnutChart = ({data,options}) => {
  return(
  <div className='ODoughnut'>
    <div className='header'>
      <h1 className='title'> University Overview</h1>
    </div>
    <Doughnut 
        data={data} 
        options={options}/>
  </div>
  )
}

export default ODoughnutChart;