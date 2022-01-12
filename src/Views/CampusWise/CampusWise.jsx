
import axios from "axios";
import React, {useEffect,useState} from "react";
import ODoughnutChart from "../Overall/charts/ODoughnut";
import OVerticalBarChart from "../Overall/charts/OVerticalBarChart";
import _ from 'lodash';
import { unstable_batchedUpdates } from "react-dom";

const CampusNames = {
    "vskp": "Visakhapatnam",
    "hyd": "Hyderabad",
    "blr":"Bengaluru",
}

function CampusWise(){
    const [campusData,setCampusData] = useState({})
    const [instData,setInstData] = useState([])
    const [instList,setInstList] = useState([])
    const [campusList,setCampusList] = useState([])
    const [showD2,setShowD2] = useState(false)
    const [showVC,setShowVc] = useState(false)
    const chartOptions = {
        Doughnut : {
            onClick: function (evt, item) {
              if (item[0]) {
                    // console.log('ask data for',campusList[item[0].index])
                  getData(campusList[item[0].index][0])
              }
            },
            rotation: Math.PI * 5,
        },
        Doughnut2 : {
            onClick: function (evt, item) {
              if (item[0]) {
                  getData(campusList[item[0].index])
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
    var dataDoughnut ={
        labels: campusList.map(item=>CampusNames[item[0]]),
        datasets: [{
            label: "Number of Institutes",
            data: campusList.map(item=>item[1]), 
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
    if(showD2)
    {
        var dataDoughnut2 ={
        labels: instList.map(item=>item.toUpperCase()),
        datasets: [{
            label:`Institutes in Campus`,
            data: instList.map(item=>1), 
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
}
    // getting the list of campuses in each
    const getData =(campusName)=>{
        const arr = _.without(campusData.map(item=>item.name===campusName?item.institutes:null),null)
        console.log('institutes for the campus',campusName,...arr)
        unstable_batchedUpdates(()=>{
            setInstList(...arr)
            setShowD2(true)
        })

    }
    const getCampus = () =>{
        axios.get('https://gcgc-dashboard.herokuapp.com/organization/campus/')
        .then(resp=>{
            var arr = _.get(resp,['data','result']).map(item=>[item.name,item.inst_count])
            console.log(arr)
            unstable_batchedUpdates(()=>{
                setCampusList(arr)
                setCampusData(_.get(resp,['data','result']))
            })
        })
    }
    useEffect(()=>{
        getCampus()
    },[])
    return (
        <div>
            <div className='overall-layout'>
                <div className="chartsContainer">
                    <div className='row1'>
                        <div className='overall_charts' id='c1'>
                            <ODoughnutChart title={"Campus Wise Overview"} data={dataDoughnut} options={chartOptions.Doughnut}/> 
                        </div>
                            {showD2?
                            <ODoughnutChart title={"Institute Overview"} data={dataDoughnut2} options={chartOptions.Doughnut2}/> 
                            :null}
                        {/* {showVC?
                        <div className="overall_charts" id="c2">
                            <OVerticalBarChart title={"Student Details"} data={VerticalBarChart1} options={chartOptions.VerticalBarChart1}/>
                        </div> : null } */}
                    </div>
                    {/* {showVC?
                    <div className='row2'>
                        <div className="overall_charts" id="c3">
                            <OVerticalBarChart title={"Placement Details"} data={VerticalBarChart2} options={chartOptions.VerticalBarChart2}/>
                        </div>
                        <div className="overall_charts" id="c4">
                            <OVerticalBarChart title={"Salary Details"} data={VerticalBarChart3} options={chartOptions.VerticalBarChart3}/>
                        </div>
                    </div> : null} */}
                </div>
            </div>
        </div>
    )
}

export default CampusWise;