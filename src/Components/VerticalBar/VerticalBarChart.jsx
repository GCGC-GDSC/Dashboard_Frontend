import React from 'react';
import { Bar } from 'react-chartjs-2';



const VerticalBar = ({campus,options}) => {
  console.log(campus)
  var git = 100
  var gim = 100
  var gst = 190

  for(let inst in campus) {
    console.log(inst)
    const [ug,pg] = [...campus[inst]]
    if(inst =='GIT')
      git =ug[0].total_students + pg[0].total_students
    if(inst =='GIM')
      gim =ug[0].total_students + pg[0].total_students
    if(inst =='GST')
      gst =ug[0].total_students + pg[0].total_students
  }
  console.log(git,gim,gst)
  // lablesList = campus keys extract
  const data = {
    labels: ['GIT', 'GIM', 'GST'],
    datasets: [
      {
        label: 'Number of Students',
        data: [git,gim,gst],
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
        borderWidth: 1,
      },
    ],
  };
  
  // const options = {
  //   onClick:function (evt,item) {
  //     console.log(item[0].index)
  // },
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };


  return(<>
    <div className='header'>
      <h1 className='title'>Individual Institute Population</h1>
    </div>
    <Bar data={data} options={options} />
  </>)
}

export default VerticalBar;