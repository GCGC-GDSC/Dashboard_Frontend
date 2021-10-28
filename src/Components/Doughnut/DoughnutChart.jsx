import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Hydrabad', 'Vizag', 'Banglore'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
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

const DoughnutChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Gitam Placement Information</h1>
    </div>
    <Doughnut data={data} width={30}
         options={{ maintainAspectRatio: false }}/>
  </>
);

export default DoughnutChart;