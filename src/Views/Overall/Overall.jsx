import React, { useContext,useEffect, useState,useRef } from 'react';
import ODoughnutChart from './charts/ODoughnut';
import axios from 'axios';
import OVerticalBarChart from './charts/OVerticalBarChart';
import './Overall.styles.scss'
import { unstable_batchedUpdates } from 'react-dom';
import _ from 'lodash';
import objRef,{parsedDataFormat,streamToInstCount} from './APIKeys.js'
import Table from "../../Components/Table/Table"
import ColorPallet ,{colors} from "../ColorAssets/colorPallet.js";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { UserContext } from "../../context/context";
import {instMap} from "../../Pages/Admin/StudentDetailsFormObj"
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


function Overall() {
  
  const user = useContext(UserContext);
  function tranpose(matrix) {
    return _.zip(...matrix);
  }

  const headingRef = useRef()
//   skrr end
    // const hostname = 'https://gcgc-dashboard.herokuapp.com'
    const [streamData,setStreamData] = useState({})
    const [streamList,setStreamList] = useState([])
    const [showVC,setShowVC] = useState(false)
    //for the main doughtnut in overall section-- this is to display the number of inst per campus
    // for the table
    const VChartColors =colors
    const chartOptions = {
        Doughnut : {
            onClick: function (evt, item) {
              if (item[0]) {
                  getData(streamList[item[0].index])
              }
            },
            rotation: Math.PI * 5,
            plugins: {
                legend: {
                    
                    position: "left",

               },
           },

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
    labels: streamList.map(item=>item[0]+item.slice(1,item.length)),
    datasets: [{
        label: "Number of Students",
        data: streamList.map(item=>streamToInstCount[item.toLowerCase()]), 
        backgroundColor: streamList.map(item=>ColorPallet[item.toLowerCase()]),
          borderColor:streamList.map(item=>ColorPallet[item.toLowerCase()]),
        borderWidth: 1,
        
        },],
    }
    if(showVC)
     {
        const combineArrays = (k,a1,a2,category) =>{
            const arr = []
            if(category === "salary"){

              console.log('-->',k,a1,a2,category);
                arr.push(Math.max(a1[k[0]] ,a2[k[0]] ) );
                arr.push(Math.min(a1[k[1]] ,a2[k[1]] ) )
                arr.push((a1[k[2]] + a2[k[2]] ) / 2 )


                // for(let i =0;i <k.length;i++)
                // {
                //     arr.push(Math.max(a1[k[i]] ,a2[k[i]] ) )
                // }
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
                    label:instMap[inst.toLowerCase()],
                    data: combineArrays(keys,streamData[inst][0][0][category],streamData[inst][1][0][category],category).values ,
                    backgroundColor: VChartColors[index],
                    borderColor: VChartColors[index],
                    borderWidth: 2,
                }   
                })
            return dataArray
        }
        // const returnDataAsString = (obj,objName)=>{
        //     let str = ""
        //     let keys  = objRef[objName]
        //     for(let i=0;i<keys.length;i++){
        //         str += obj[keys[i]]
        //     }
        //     return str
        // }
        const getTableData = (category)=>{
            const insts = streamData.institutes;
            let keys  = objRef[category]
            const matrix = []
            insts.forEach(inst=>{
                const data = combineArrays(keys,streamData[inst][0][0][category],streamData[inst][1][0][category],category).values
                matrix.push(data)
            })
           const tp =  tranpose(matrix)
            return tp
        }
        var VerticalBarChart1 ={
        labels:parsedDataFormat["student_details"],
        datasets :getDataForVC(objRef["student_details"],"student_details")
        }
        var VerticalBarChart2 ={
            labels:parsedDataFormat["placement_details"],
            datasets :getDataForVC(objRef["placement_details"],"placement_details")
            }
        var VerticalBarChart3 ={
            labels:parsedDataFormat["salary"],
            datasets :getDataForVC(objRef["salary"],"salary")
            }
// - ---------------------------------- tables -
            var Table1 ={
            column:streamData.institutes,
            data :getTableData("student_details")
            }
            var Table2 ={
                column:streamData.institutes,
                data :getTableData("placement_details")
                }
            var Table3 ={
                column:streamData.institutes,
                data :getTableData("salary")

                }
    }
    const getData = (stream)=>{
      axios.get(`${REACT_APP_API_URL}students/overall/${stream}/`,{
        headers: {
          'Authorization': `Token ${user.user.token.key}`
        }
      }).then(resp=>{
        var responseData = _.get(resp,['data','result'])
        headingRef.current.click()
        unstable_batchedUpdates(()=>{
          setStreamData({...responseData,institutes:[...Object.keys(responseData)],streamName:stream})
          setShowVC(true)
        })
        })
    }
  
    // const getInstituteCountPerCampus = () => {
    //   axios.get(`${REACT_APP_API_URL}organization/campus/`)
    //   .then((resp) => {
    //     var instCountPerCampus = _.get(resp,['data','result']).map(item => item.inst_count)
    //     setInstPerCampus(instCountPerCampus)
    //   })
    // }
    
    useEffect(()=>{
      const getStreams = ()=>{
        axios.get(`${REACT_APP_API_URL}organization/streams/`,{
          headers: {
            'Authorization': `Token ${user.user.token.key}`
          }
        })
        .then(resp=>{
            var arr = _.get(resp,['data','result']).map(item=>item.name)
            // arr.sort()
            setStreamList(arr)
        })
    }  
      getStreams()

    },[user ])

    
    return(
<Box p={5} className='overall_box'>
{/* <ToggleButtonGroup
      color="primary"
      value={mode}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="chart">Charts</ToggleButton>
      <ToggleButton value="table">Tables</ToggleButton>
    </ToggleButtonGroup> */}
  
  <Grid container spacing={9}  className="firstItem" alignItems="center" >

      <Grid item xs={6} className='firstDoughnut'>

        <ODoughnutChart
          title={"University overview "}
          data={dataDoughnut}
          options={chartOptions.Doughnut}
        />

      </Grid>
      </Grid>
      <Grid container spacing={9} mt={4}>
      {/* 2nd row */}
      <a href={`#stream`} ref={headingRef}>
      </a>
      
      {showVC ? (      
          <>
        <div className="headings" id={`stream`} >
          <div className="sub">
     { streamData.streamName}
     </div>
          </div>
          <div className="headings" id={`stream`} >
          <div className="sub">
          Student Details
     </div>
          </div>
      <Grid container  spacing={2} ml={10} mt={6} marginTop="0px">
      
      <Grid item xs={7}   mr={5} className='firstDoughnut'>
          <OVerticalBarChart
            
            data={VerticalBarChart1}
            options={chartOptions.VerticalBarChart1}
          />
        </Grid>
        <Grid item xs={4} className="table-container">
        <Table  column={Table1.column} data={Table1.data} category={"Student Details"} keys={parsedDataFormat["student_details"]}/>


        </Grid>

        </Grid>
        
        </>
      ) : null}
    {showVC?
        <>
           <div className="headings" id={`stream`} >
          <div className="sub">
          Placement Details
     </div>
          </div>
          <Grid container  ml={10} mt={6}  spacing={2} alignItems="center">
          <Grid item xs={7} mr={5} className='firstDoughnut' >
          <OVerticalBarChart
            
            data={VerticalBarChart2}
            options={chartOptions.VerticalBarChart2}
          />
        </Grid>
      <Grid item xs={4}  className="table-container">
        <Table  column={Table2.column} data={Table2.data} category={"Placement Details"} keys={parsedDataFormat["placement_details"]}/>
      </Grid>
        </Grid>
        <div className="headings" id={`stream`} >
          <div className="sub">
          Package Details
     </div>
          </div>
          <Grid container  ml={10} mt={6} spacing={2} alignItems="center">
            <Grid item xs={7}   mr={5} className='firstDoughnut'>
              <OVerticalBarChart
                
                data={VerticalBarChart3}
                options={chartOptions.VerticalBarChart3}
              />
            </Grid>
            <Grid item xs={4}>
              <Table column={Table3.column} data={Table3.data} category={"Package(LPA)"} keys={parsedDataFormat["salary"]}/> 
            </Grid>
        </Grid>
        
        </>: null}
  </Grid>
</Box>




    )
}
export default Overall