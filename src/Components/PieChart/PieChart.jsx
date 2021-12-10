import React from 'react';
import { Pie } from 'react-chartjs-2';



const PieChart = ({data,type}) => (
  <>
    <div className='header'>
      <h1 className='title'>Institute Population</h1>
      <h2>{type}</h2>
    </div>
    <Pie data={data} />
  </>
);

export default PieChart;