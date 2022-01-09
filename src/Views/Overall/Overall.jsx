import React, { useEffect, useState } from 'react';
import ODoughnutChart from './charts/ODoughnut';
import axios from 'axios';
import OVerticalBarChart from './charts/OVerticalBarChart';
import './Overall.styles.scss'
import OverallFetcher from './OverallFetcher.component';
var _ = require('lodash');
function Overall() {
    const hostname = 'https://gcgc-dashboard.herokuapp.com'
    const [stream,setStream] = useState('')
    const [streamData,setStreamData] = useState({})
    const streamsList = ['engineering','management','sciences','pharmacy','oco','statistics' ]
    
    const parseData = () =>{

    }
    const chartOptions = {
        Doughnut : {
            onClick: function (evt, item) {
              if (item[0]) {
                  setStream(streamsList[item[0].index])
              }
            },
            rotation: Math.PI * 0.5,
        },
        VerticalBarChart1 : {
            onClick: function (evt, item) {
                if (item[0]) {

                }
              },
        },
        VerticalBarChart2 : {
            onClick: function (evt, item) {
                if (item[0]) {

                }
              },
        },
        VerticalBarChart3 : {
            onClick: function (evt, item) {
                if (item[0]) {

                }
              },
        }
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
        VerticalBarChart1:{
            labels: ['Eligible for Placements','Backlogs','Higher Studies'], // Object.getKeys(result)
            datasets: [
                {
                label: "GIT",
                data: [102,103,105], // fetchData(stream,git)
                backgroundColor: [
                    "#6050DC",],
                borderColor: [
                    "rgba(255, 159, 64, 1)",],
                borderWidth: 2,
              },
              {
                label: "SoTH",
                data: [232,403,105], // fetchData(stream,SoTH)
                backgroundColor: [
                    "#FF2E7E",],
                borderColor: [
                    "#6050DC",],
                borderWidth: 2,
              },
              {
                label: "SoTB",
                data: [302,403,205], // fetchData(stream,SoTB)
                backgroundColor: [
                    "#FFAB05",],
                borderColor: [
                    "rgba(255, 159, 64, 1)",],
                borderWidth: 2,
              },
            ],
        },
        VerticalBarChart2:{
            labels: ['Eligible for Placements','Total Offers','Multiple Offers','Placed(Single Offer)','Yet to be placed'], // Object.getKeys(result)
            datasets: [
                {
                label: "GIT",
                data: [102,103,105,244,342], // fetchData(stream,git)
                backgroundColor: [
                    "#6050DC",],
                borderColor: [
                    "rgba(255, 159, 64, 1)",],
                borderWidth: 2,
              },
              {
                label: "SoTH",
                data: [232,403,105,321,465], // fetchData(stream,SoTH)
                backgroundColor: [
                    "#FF2E7E",],
                borderColor: [
                    "#6050DC",],
                borderWidth: 2,
              },
              {
                label: "SoTB",
                data: [302,403,205,645,323], // fetchData(stream,SoTB)
                backgroundColor: [
                    "#FFAB05",],
                borderColor: [
                    "rgba(255, 159, 64, 1)",],
                borderWidth: 2,
              },
            ],
            },
        VerticalBarChart3:{
            labels: ['Highest','Lowest','Average'], // Object.getKeys(result)
            datasets: [
                {
                label: "GIT",
                data: [32,2,12], // fetchData(stream,git)
                backgroundColor: [
                    "#6050DC",],
                borderColor: [
                    "rgba(255, 159, 64, 1)",],
                borderWidth: 2,
                },
                {
                label: "SoTH",
                data: [23,3,15], // fetchData(stream,SoTH)
                backgroundColor: [
                    "#FF2E7E",],
                borderColor: [
                    "#6050DC",],
                borderWidth: 2,
                },
                {
                label: "SoTB",
                data: [14,4,5], // fetchData(stream,SoTB)
                backgroundColor: [
                    "#FFAB05",],
                borderColor: [
                    "rgba(255, 159, 64, 1)",],
                borderWidth: 2,
                },
            ],
            },
    }
    const getData = (stream)=>{
        if(stream.length>0)
        {axios.get(`${hostname}/students/overall/${stream}/`).then(resp=>{
            var responseData = _.get(resp,['data','result'])
            // console.log(responseData)
            setStreamData(responseData)
        })}
    }
    return(
        <div className="overall">
                <h2>
                    Overall University Statistics
                </h2>
            <section className='overall-layout'>
                <div className="chartsContainer">
                    <div className='row1'>
                        <div className='overall_charts' id='c1'>
                            <ODoughnutChart data={chartData.Doughnut} options={chartOptions.Doughnut}/> 
                        </div>
                        <div className="overall_charts" id="c2">
                            <h2>{stream}</h2>
                            <OVerticalBarChart data={chartData.VerticalBarChart1} options={chartOptions.VerticalBarChart1}/>
                        </div>
                    </div>
                    <div className='row2'>
                        <div className="overall_charts" id="c3">
                            <h2>{stream}</h2>
                            <OVerticalBarChart data={chartData.VerticalBarChart2} options={chartOptions.VerticalBarChart2}/>
                        </div>
                        <div className="overall_charts" id="c4">
                            <h2>{stream}</h2>
                            <OVerticalBarChart data={chartData.VerticalBarChart3} options={chartOptions.VerticalBarChart3}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Overall