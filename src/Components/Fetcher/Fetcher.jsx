import React, { useEffect, useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { unstable_batchedUpdates } from "react-dom";
import Axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DoughnutChart from "../Doughnut/DoughnutChart";
import VerticalBar from "../VerticalBar/VerticalBarChart";
import HorizontalBarChart from "../HorizontalBar/HorizontalBar";
import result from "./localDB";
import PieChart from "../PieChart/PieChart";
import Button from "../Buttons/Button"
import './Fetcher.style.scss'

function Fetcher() {
  const [totalResult, setTotalResult] = useState({});
  const [showBC,setShowBC] = useState([true,false,false])
  const [unlockVertChart,setUnlockVC] = useState(false)
  const [unlockHoriChart,setUnlockHC] = useState(false)
  const [slideNo,setSlideNo] = useState(0)
  const [campusId, setCampusId] = useState(0);
  const [instId, setInstId] = useState(0); //this is for institutions like GIT,GST under specific campuses
  const [Hstudents, setHStudents] = useState([]);
  const [Vstudents, setVStudents] = useState([]);
  const [Bstudents, setBStudents] = useState([]);
  const [type, setType] = useState() // this is for the PieChart Component in the HomePage
  const [dataPie, setDataPie] = useState({
    //This is setting the data object with some inital values, after the UG,PG or UGPG button is clicked which are in the PieChart this PieData will be replaced.
    labels: ["Please select the Campus and Insitution"],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        borderWidth: 1,
      },
    ],
  });
  const { vskp, blr, hyd } = result;
//  this function iterates over all the campuses and gets the total number of students in total (city wise)
  const getLocalStudents = () => {
    var vskpTotal = 0;
    for (let inst in vskp) {
      let institute = vskp[inst];
      vskpTotal +=
        institute[0].total_students + institute[1].total_students;
    }
    var blrTotal = 0;
    for (let inst in blr) {
      let institute = blr[inst];
      blrTotal +=
        institute[0].total_students + institute[1].total_students;
    }
    var hydTotal = 0;
    for (let inst in hyd) {
      let institute = hyd[inst];
      hydTotal +=
        institute[0].total_students + institute[1].total_students;
    }
    unstable_batchedUpdates(() => {
      setTotalResult(result);
      setBStudents(blrTotal);
      setVStudents(vskpTotal);
      setHStudents(hydTotal);
    });
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  // DoughNut data and options
  //options
  const optionsDoughnut = {
    onClick: function (evt, item) {
      // console.log('@@@',item[0])
      var arr = showBC
      arr[1] = true
      if(item[0])
      {unstable_batchedUpdates(()=>{
        setSlideNo(prev=>prev+1)
        setShowBC(arr)
        setCampusId(item[0].index);
        setUnlockVC(true)
      })}
    },
    rotation: Math.PI * 0.5,
  };

  //data
  const dataDoughnut = {
    labels: ["Vizag", "Hyderabad", "Banglore"],
    datasets: [
      {
        label: "# of Votes",
        data: [Vstudents, Hstudents, Bstudents],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // VertticalBar chart options
  const optionsVert = {
    onClick: function (evt, item) {
       var arr = showBC
      arr[2] = true
      if(item && item[0])
     { unstable_batchedUpdates(()=>{
        setSlideNo(prev=>prev+1);
        setShowBC(arr)
        setInstId(item[0].index);
        setUnlockHC(true)
      })}
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  //populating PG and UG variables
  let populationPG = 0;
  let populationUG = 0;
  //  --------------------------- @modify these to add new institute or campus @-------------------------
  const dirCamp = ["vskp","hyd","blr"]
  const dirIns = Object.keys(result[dirCamp[campusId]])
  if(unlockHoriChart && showBC[2])
  {
  populationUG = result[dirCamp[campusId]][dirIns[instId]][0].total_final_years
  populationPG = result[dirCamp[campusId]][dirIns[instId]][1].total_final_years
}
  //   HorizontalBar data
  const dataHC = {
    labels: ["UnderGraduate", "PostGraduate"],
    datasets: [
      {
        label: '# number of students',
        data: [populationUG, populationPG],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 0, 0, 0.8)",
          "rgba(255, 0, 0, 0.6)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  let campuses = dirCamp; // this is used in dataUG,dataPG,dataUGPG

  // ------------------------------------------ITERATE AND ASSIGN -----------------------------
  let allInsitutes = dirIns
  ; // this is used in dataUG,dataPG,dataUGPG

  //this function is called when the dataUG button is clicked
  //this function is responsible for displaying the UG data provided the campusId and instId
  const dataUG = () => {
    let total_higher_study_and_pay_crt =
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_higher_study_and_pay_crt;
    let total_not_intrested_in_placments =
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_not_intrested_in_placments;
    let total_backlogs =
      result[campuses[campusId]][allInsitutes[instId]][0].total_backlogs;
    let total_students_eligible =
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_students_eligible;
    let total_offers =
      result[campuses[campusId]][allInsitutes[instId]][0].total_offers;
    let total_multiple_offers =
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][0].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][0].total_yet_to_place;
      // --------------------------ITERATE AND ASSIGN -------------------------------------------

    let arr = [
      total_higher_study_and_pay_crt,
      total_not_intrested_in_placments,
      total_backlogs,
      total_students_eligible,
      total_offers,
      total_multiple_offers,
      total_placed,
      total_yet_to_place,
    ];
    setDataPie({
      // --------------------------ITERATE AND ASSIGN -------------------------------------------
      labels: [
        "Higher Studies and Pay CRT",
        "not intrested in placments",
        "backlogs",
        "students eligible",
        "offers",
        "multiple offers",
        "placed",
        "yet to place",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: arr,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setType("UG")
  };
  const dataPG = () => {
    let total_higher_study_and_pay_crt =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_higher_study_and_pay_crt;
    let total_not_intrested_in_placments =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_not_intrested_in_placments;
    let total_backlogs =
      result[campuses[campusId]][allInsitutes[instId]][1].total_backlogs;
    let total_students_eligible =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_students_eligible;
    let total_offers =
      result[campuses[campusId]][allInsitutes[instId]][1].total_offers;
    let total_multiple_offers =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][1].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][1].total_yet_to_place;
      // --------------------------ITERATE AND ASSIGN -------------------------------------------

    let arr = [
      total_higher_study_and_pay_crt,
      total_not_intrested_in_placments,
      total_backlogs,
      total_students_eligible,
      total_offers,
      total_multiple_offers,
      total_placed,
      total_yet_to_place,
    ];
    setDataPie({
      // --------------------------ITERATE AND ASSIGN -------------------------------------------

      labels: [
        "Higher Studies and Pay CRT",
        "total_not_intrested_in_placments",
        "total_backlogs",
        "total_students_eligible",
        "total_offers",
        "total_multiple_offers",
        "total_placed",
        "total_yet_to_place",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: arr,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setType("PG")

  };
  const dataUGPG = () => {
    let total_higher_study_and_pay_crt =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_higher_study_and_pay_crt +
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_higher_study_and_pay_crt;
    let total_not_intrested_in_placments =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_not_intrested_in_placments +
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_not_intrested_in_placments;
    let total_backlogs =
      result[campuses[campusId]][allInsitutes[instId]][1].total_backlogs +
      result[campuses[campusId]][allInsitutes[instId]][0].total_backlogs;
    let total_students_eligible =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_students_eligible +
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_students_eligible;
    let total_offers =
      result[campuses[campusId]][allInsitutes[instId]][1].total_offers +
      result[campuses[campusId]][allInsitutes[instId]][0].total_offers;
    let total_multiple_offers =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_multiple_offers +
      result[campuses[campusId]][allInsitutes[instId]][0]
        .total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][1].total_placed +
      result[campuses[campusId]][allInsitutes[instId]][0].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][1]
        .total_yet_to_place +
      result[campuses[campusId]][allInsitutes[instId]][0].total_yet_to_place;
      // --------------------------ITERATE AND ASSIGN -------------------------------------------

    let arr = [
      total_higher_study_and_pay_crt,
      total_not_intrested_in_placments,
      total_backlogs,
      total_students_eligible,
      total_offers,
      total_multiple_offers,
      total_placed,
      total_yet_to_place,
    ];
      // --------------------------ITERATE AND ASSIGN -------------------------------------------

    setDataPie({
      labels: [
        "Higher Studies and Pay CRT",
        "total_not_intrested_in_placments",
        "total_backlogs",
        "total_students_eligible",
        "total_offers",
        "total_multiple_offers",
        "total_placed",
        "total_yet_to_place",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: arr,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setType("UG + PG")
  };
  const handleIndexChange = (e)=>{
    const val = e.target.dataset.name
    var arr = showBC
    arr[val] = true
    for(let i=0;i<3;i++)
    {
      if(i>val)
      {
        arr[i] = false
      }
    }
    if(val === 1){
      unstable_batchedUpdates(()=>{
      setShowBC(arr)
      setUnlockVC(true)
      setSlideNo(parseInt(e.target.dataset.name))
      })
    }
    else{
      unstable_batchedUpdates(()=>{
      setShowBC(arr)
      setSlideNo(parseInt(e.target.dataset.name))
      })
    }
  }
  useEffect(() => {
    getLocalStudents();
    dataUGPG();
  },[]);
  return (
    <div className="fetcher-container">
    {console.log(showBC,'bc states')}
      <div className="fetcher">
        <div className="fetcher_carousel-container">
          <div className="breadCrumps">
             <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <p data-name='0' onClick={handleIndexChange}>
                    University
                  </p>
                  {unlockVertChart && showBC[1]?  
                    <p data-name='1' onClick={handleIndexChange}>
                      Campus
                    </p>
                    : null}
                  {unlockHoriChart && showBC[2]?
                  <p style={{display:'flex',flexDirection:'row'}}>
                    <p data-name='2' onClick={handleIndexChange}>
                    Institutes / {' '}
                    </p> 
                    <p data-name='3' onClick={handleIndexChange}>
                      Graduation system
                    </p>
                  </p>:null}
                </Breadcrumbs>
              </div>
          </div>
          <Carousel
          className="fetcher_charts_div"
          // useKeyboardArrows={true}
          showIndicators={false}
          showArrows={false}
          showThumbs={false}
          selectedItem={slideNo}
          showStatus={false}
          >         
            <div className="Chart_holder">
                  <DoughnutChart
                    style={{ boxShadow: "0 3px 10px black;" }}
                    campusId={campusId}
                    data={dataDoughnut}
                    options={optionsDoughnut}
                    setUnlockVC={setUnlockVC}
                    setSlideNo={setSlideNo}
                  />
            </div>
            {
            unlockVertChart && showBC[1]?
            <div className="Chart_holder">
            <button onClick={()=>{
                unstable_batchedUpdates(()=>{
                  setSlideNo(prev=>prev-1)
                  setUnlockVC(false)
                })
              }}>
                <Button btnText="⬅Back"></Button>
              </button>
                {campusId === 0 ? (
                  <VerticalBar campus={totalResult["vskp"]} options={optionsVert} />
                ) : null}
                {campusId === 1 ? (
                  <VerticalBar campus={totalResult["hyd"]} options={optionsVert} />
                ) : null}
                {campusId === 2 ? (
                  <VerticalBar campus={totalResult["blr"]} options={optionsVert} />
                ) : null}
            </div> : <p ></p>
            }
            {
              unlockHoriChart && showBC[2]?
              <div className="Chart_holder">
                <button onClick={()=>{
                unstable_batchedUpdates(()=>{
                  setSlideNo(prev=>prev-1)
                  setUnlockHC(false)
                })
                }}>
                  <Button btnText="⬅Back"></Button>
                </button>
              <button onClick={()=>setSlideNo(prev=>prev+1)}>
              <Button btnText="Next ➡"></Button>
              </button>
                <HorizontalBarChart data={dataHC} inst={result[dirCamp[campusId]][dirIns[instId]][0]} />
              </div> :<p></p>
            }
            { unlockHoriChart && showBC[2]?
            <div className="Chart_holder">
                <button onClick={()=>setSlideNo(prev=>prev-1)}>
                <Button btnText="⬅Back"></Button>
                </button>
                  <PieChart instName={result[dirCamp[campusId]][dirIns[instId]][0].under_institute_name} data={dataPie} type={type}/>
                  <div className="PieButtons">
                  <button onClick={dataUG}><Button btnText="UG"></Button></button>
                  <button onClick={dataPG}><Button btnText="PG"></Button></button>
                  <button onClick={dataUGPG}><Button btnText="UG + PG"></Button></button>
                </div>
            </div>:<p></p>}
          </Carousel>
        </div>
        <div  className="fetcher_content_div">
            <p>
            Gandhi Institute of Technology and Management, formerly GITAM University and GITAM College of Engineering is a private deemed university located in Visakhapatnam, Hyderabad and Bengaluru in India. It was founded in 1980 by Dr. M.V.V.S. Murthi.
            </p>
        </div>
      </div>
    </div>
  );
}

export default Fetcher;