import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({vizag,hyd,blr}) => {
  // console.log(vizag,"😀",hyd," ",blr);
  const data = {
    labels: ['Vizag','Hydrabad', 'Banglore'],
    datasets: [
      {
        label: '# of Votes',
        data: [vizag,hyd,blr],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  return(
  <>
    <div className='header'>
      <h1 className='title'>All 3 Campuses Student Total Strength</h1>
    </div>
    <Doughnut data={data} options={{onClick:function (evt,item) {(item[0].index===0)?alert("red light"):alert("blue light")},rotation:Math.PI*0.5}}/>
  </>
  )
}

export default DoughnutChart;