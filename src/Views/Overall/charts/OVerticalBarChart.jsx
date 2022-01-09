import React from 'react';
import { Bar } from 'react-chartjs-2';



const OVerticalBarChart = ({data,options}) => {  
  return(<>
    <div className='header'>
      <h1 className='title'>Title </h1>
    </div>
    <Bar data={data} options={options} />
  </>)
}

export default OVerticalBarChart;