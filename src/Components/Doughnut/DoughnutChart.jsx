import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data,options,setUnlockVC}) => {
  return(
  <>
    {/* <div className='header'>
      <h1 className='title'> Total Strength</h1>
    </div> */}
    <Doughnut data={data} 
    options={options}/>
  </>
  )
}

export default DoughnutChart;