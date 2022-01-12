import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ODoughnutChart = ({title,data,options}) => {
  return(
  <div className='ODoughnut'>
    <div className='header'>
      <h1 className='title'> {title}</h1>
    </div>
    <Doughnut 
        data={data} 
        options={options}/>
  </div>
  )
}

export default ODoughnutChart;