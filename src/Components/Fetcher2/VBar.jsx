import React from "react"
import { Bar } from 'react-chartjs-2';


const VBar = ({company}) => {
const data = {
    labels: ['cs','it','ece'],
    datasets: [
      {
        label: 'Number of Students',
        data: [10,30,7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
        borderWidth: 1,
      },
    ],
  };

  return<>
    <Bar data={data}/>
  </>

}

export default VBar;