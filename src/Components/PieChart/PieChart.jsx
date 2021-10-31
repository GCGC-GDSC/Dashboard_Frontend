import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['totalStudents', 'Higher Studies and Pay CRT', 'total_not_intrested_in_placments', 'total_backlogs', 'total_students_eligible', 'total_offers','total_multiple_offers','total_placed','total_yet_to_place'],
  datasets: [
    {
      label: '# of Votes',
      data: [100,20,3,10,87,30,20,10,77],
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
      borderWidth: 1,
    },
  ],
};

const PieChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Institute Population</h1>
    </div>
    <Pie data={data} />
  </>
);

export default PieChart;