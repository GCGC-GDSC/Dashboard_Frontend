import React, { useEffect, useState } from 'react';
import ODoughnutChart from './charts/ODoughnut';
import axios from 'axios';
import OVerticalBarChart from './charts/OVerticalBarChart';
import './Overall.styles.scss'
import OverallFetcher from './OverallFetcher.component';
import { unstable_batchedUpdates } from 'react-dom';
import _ from 'lodash';
import objRef from './APIKeys.js'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
function Overall() {
    const hostname = 'https://gcgc-dashboard.herokuapp.com'
    const [streamData,setStreamData] = useState({})
    const [streamList,setStreamList] = useState([])
    const [showVC,setShowVC] = useState(false)
    const VChartColors = [
        "#6050DC",
        "#FF2E7E",
        "#FF6B45",
        "#FFAB05",
        "rgba(255, 159, 64, 1)"]
    const chartOptions = {
        Doughnut : {
            onClick: function (evt, item) {
              if (item[0]) {
                  getData(streamList[item[0].index])
              }
            },
            rotation: Math.PI * 5,
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
    const dataDoughnut ={
    labels: streamList.map(item=>item[0].toUpperCase()+item.slice(1,item.length)),
    datasets: [{
        label: "Number of Students",
        data: [32490,23003,12034,45044,23034,22032], 
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
    }
    if(showVC)
     {
        const combineArrays = (k,a1,a2,category) =>{
            const arr = []
            if(category === "salary"){
                for(let i =0;i <k.length;i++)
                {
                    arr.push(Math.max(a1[k[i]] ,a2[k[i]] ) )
                }
            }
            else{
                for(let i =0;i <k.length;i++)
                {
                    arr.push(a1[k[i]] + a2[k[i]])
                }
            }
            return {keys:k,values:arr}
        }
        
        const getDataForVC = (keys,category) => {
            const insts = streamData.institutes
                const dataArray = insts.map((inst,index)=>{
                return{
                    label:inst ,
                    data: combineArrays(keys,streamData[inst][0][0][category],streamData[inst][0][1][category],category).values ,
                    backgroundColor: VChartColors[index],
                    borderColor: [
                        "rgba(255, 159, 64, 1)",],
                    borderWidth: 2,
                }   
                })
            return dataArray
        }
        var VerticalBarChart1 ={
        labels: objRef["student_details"],
        datasets :getDataForVC(objRef["student_details"],"student_details")
        }
        var VerticalBarChart2 ={
            labels: objRef["placement_details"],
            datasets :getDataForVC(objRef["placement_details"],"placement_details")
            }
        var VerticalBarChart3 ={
            labels: objRef["salary"],
            datasets :getDataForVC(objRef["salary"],"salary")
            }
    }
    const getData = (stream)=>{
        axios.get(`${hostname}/students/overall/${stream}/`).then(resp=>{
            var responseData = _.get(resp,['data','result'])
            unstable_batchedUpdates(()=>{
                setStreamData({...responseData,institutes:[...Object.keys(responseData)],streamName:stream})
                setShowVC(true)
            })

        })
    }
    const getStreams = ()=>{
        axios.get('https://gcgc-dashboard.herokuapp.com/organization/streams/')
        .then(resp=>{
            var arr = _.get(resp,['data','result']).map(item=>item.name)
            setStreamList(arr)
        })
    }
    useEffect(()=>{
        getStreams()
    },[])
    return(
        <Box sx={{ flexGrow: 1 }}>
                <h2>
                    Overall University Statistics
                </h2>
                <Grid container spacing={2}>
                
                        <Grid item xs={5}>
                            <ODoughnutChart title={"University Overview"} data={dataDoughnut} options={chartOptions.Doughnut}/> 
                            </Grid>
                        {showVC?
                        <Grid item xs={6}>
                            <OVerticalBarChart title={"Student Details"} data={VerticalBarChart1} options={chartOptions.VerticalBarChart1}/>
                            </Grid> : null }
                            {showVC ?
                        <div>
                  
                     <Grid item xs={6}>
                            <OVerticalBarChart title={"Placement Details"} data={VerticalBarChart2} options={chartOptions.VerticalBarChart2}/>
                    </Grid>
                    <Grid item xs={6}>
                            <OVerticalBarChart title={"Salary Details"} data={VerticalBarChart3} options={chartOptions.VerticalBarChart3}/>
                    </Grid> 
                    
                    </div>:null}
                   
            </Grid>
            </Box>
    )
}
export default Overall