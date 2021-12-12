import React from 'react';
import { Bar } from 'react-chartjs-2';



const VerticalBar = ({campus,options}) => {
  console.log('########',campus,campus[Object.keys(campus)[0]][0].under_campus_name)
  const getInstData = ()=>{
    const arr = []
    for(let inst in campus)
    {
      const [ug,pg] = [...campus[inst]]
      const val = ug.total_students + pg.total_students
      arr.push(val)
    }
    return arr
  }
  const campusNameDir = {'blr':'Bengaluru','vskp':'Visakhapatnam','hyd':'Hyderabad'}
  const data = {
    labels: Object.keys(campus),
    datasets: [
      {
        label: 'Number of Students',
        data: getInstData(),
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
  
  return(<>
    <div className='header'>
      <h1 className='title'>Individual Institute Population </h1>
      <h2> {campusNameDir[campus[Object.keys(campus)[0]][0].under_campus_name]} </h2>
    </div>
    <Bar data={data} options={options} />
  </>)
}

export default VerticalBar;