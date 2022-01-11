
import axios from "axios";
import React, {useEffect,useState} from "react";
import ODoughnutChart from "../Overall/charts/ODoughnut";
import OVerticalBarChart from "../Overall/charts/OVerticalBarChart";
import _ from 'lodash';

const CampusNames = {
    "vskp": "Visakhapatnam",
    "hyd": "Hyderabad",
    "blr":"Bengaluru",
}

function CampusWise(){
    const [campusData,setCampusData] = useState({})
    const [campusList,setCampusList] = useState([])
    const [showVC,setShowVc] = useState(false)
    const chartOptions = {
        Doughnut : {
            onClick: function (evt, item) {
              if (item[0]) {
                //   getData(streamList[item[0].index])
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
    const getCampus = () =>{
        axios.get('https://gcgc-dashboard.herokuapp.com/organization/campus/')
        .then(resp=>{
            var arr = _.get(resp,['data','result']).map(item=>[item.name,item.inst_count])
            console.log(arr)
            setCampusList(arr)
            setCampusData(_.get(resp,['data','result']))
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
                            <ODoughnutChart data={dataDoughnut} options={chartOptions.Doughnut}/> 
                        </div>
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