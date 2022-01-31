import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Division Of Graduates',
    },
  },
};

const HorizontalBarChart = ({data,inst}) => {
  const campusName = inst.under_campus_name
  const instName = inst.under_institute_name
  const campusNameDir = {'blr':'Bengaluru','vskp':'Visakhapatnam','hyd':'Hyderabad'}

  return (
  <div>
    <h1>{campusNameDir[campusName]}</h1>
    <h2>{instName}</h2>
    <div>
    <Bar data={data} options={options} inst={inst} />
    </div>
  </div>
);
  }

export default HorizontalBarChart;