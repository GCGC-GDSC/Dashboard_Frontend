import React, { useEffect, useState } from 'react';
import ODoughnutChart from './charts/ODoughnut';
import OPieChart from './charts/OPieChart';
import './Overall.styles.scss'
import OverallFetcher from './OverallFetcher.component';
function Overall() {
    const [stream,setStream] = useState('')
    const [streamData,setStreamData] = useState({})
    const streamsList = ['engineering','management','sciences','pharmacy','oco','statistics' ]
    
    const parseData = () =>{

    }
    const chartOptions = {
        Doughnut : {
            onClick: function (evt, item) {
              if (item[0]) {
                //   console.log(item[0].index,streamsList[item[0].index])
                  setStream(streamsList[item[0].index])
              }
            },
            rotation: Math.PI * 0.5,
        },

    }
    const chartData = {
        Doughnut:{
        labels: streamsList,
        datasets: [{
            label: "Number of Students",
            data: [100,230,234,454,234,232],
            backgroundColor: [
                "#6050DC",
                "#D52DB7",
                "#FF2E7E",
                "#FF6B45",
                "#FFAB05",
                "rgba(255, 159, 64, 1)",],
            borderColor: [
                "#6050DC",
                "#D52DB7",
                "#FF2E7E",
                "#FF6B45",
                "#FFAB05",
                "rgba(255, 159, 64, 1)",],
            borderWidth: 2,
          },],
        },
    }

    // useEffect(()=>{

    // })
    return(
        <div className="overall">
                <h2>
                    Overall University Statistics
                </h2>
            <section className='overall-layout'>
                <div className="chartContainer">
                    <div className='overall_charts'>
                        <ODoughnutChart data={chartData.Doughnut} options={chartOptions.Doughnut}/> 
                    </div>
                    <h1>{stream}</h1>
                    {/* <OverallFetcher stream={stream} setData={setStreamData}/> */}
                    {console.log(streamData)}
                </div>
            </section>
        </div>
    )
}
export default Overall