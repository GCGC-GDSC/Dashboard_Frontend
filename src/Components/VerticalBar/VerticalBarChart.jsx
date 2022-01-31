import React from 'react';
import { Bar } from 'react-chartjs-2';



const VerticalBar = ({campus,options}) => {
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
          '#82b74b',
          '#c94c4c',
          '#80ced6',
          '#ffcc5c',
          '#7e4a35',
          '#622569',


        ],
        borderColor: [
          'white'
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