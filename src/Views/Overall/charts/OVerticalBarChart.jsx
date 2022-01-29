import React from 'react';
import { Bar } from 'react-chartjs-2';



const OVerticalBarChart = ({title ,data,options,isCampus}) => {  
  return(<>
  {title?
    <div className='header'>
      <h1 className='title mark' style={{fontSize:isCampus?"1.4rem":null}}>{title}</h1>
    </div>:null}
    <Bar data={data} options={options} />
  </>)
}

export default OVerticalBarChart;