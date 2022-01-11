import React from 'react';
import { Pie } from 'react-chartjs-2';



const PieChart = ({instName,data,type}) => {

  const options = {
    responsive: true,
    cutoutPercentage: 50,
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontSize: 14,
      }
    }
  }
  return(
  <>
    {/* <div className='header'>
      <h1 className='title'>Institute Population</h1>
      <h2>{type}</h2>
    </div> */}
    <Pie data={data} options={options}/>
  </>)
};

export default PieChart;