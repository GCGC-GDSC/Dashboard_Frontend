import React from 'react';
import { Bar } from 'react-chartjs-2';



const OVerticalBarChart = ({title ,data,options}) => {  
  return(<>
    <div className='header'>
      <h1 className='title'>{title}</h1>
    </div>
    <Bar data={data} options={options} />
  </>)
}

export default OVerticalBarChart;