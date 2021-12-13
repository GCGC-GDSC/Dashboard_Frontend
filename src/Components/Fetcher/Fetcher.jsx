import React, { useEffect, useState, useRef } from "react";
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

  const getLocalStudents = () => {
    var vskpTotal = 0;
    for (let inst in vskp) {
      let institute = vskp[inst];
      vskpTotal +=
        institute[0][0]["total_students"] + institute[1][0]["total_students"];
    }
    var blrTotal = 0;
    for (let inst in blr) {
      let institute = blr[inst];
      console.log(institute);
      blrTotal +=
        institute[0][0]["total_students"] + institute[1][0]["total_students"];
    }
    var hydTotal = 0;
    for (let inst in hyd) {
      let institute = hyd[inst];
      hydTotal +=
        institute[0][0]["total_students"] + institute[1][0]["total_students"];
    }
    console.log(hydTotal, vskpTotal, blrTotal);
    unstable_batchedUpdates(() => {
      setTotalResult(result);
      setBStudents(blrTotal);
      setVStudents(vskpTotal);
      setHStudents(hydTotal);
    });
  };

  useEffect(() => {
    getLocalStudents();
    dataUGPG();
  }, []);

  // DoughNut data and options
  //options
  const optionsDoughnut = {
    onClick: function (evt, item) {
      console.log(item[0].index);
      setCampusId(item[0].index);
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
  const options = {
    onClick: function (evt, item) {
      console.log(item[0].index);
      setInstId(item[0].index);
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
  if (campusId === 0 && instId === 0) {
    //vskp,git
    populationUG = vskp["GIT"][0][0].total_final_years;
    populationPG = vskp["GIT"][1][0].total_final_years;
  }
  if (campusId === 0 && instId === 1) {
    //vskp,gim
    populationUG = vskp["GIM"][0][0].total_final_years;
    populationPG = vskp["GIM"][1][0].total_final_years;
  }
  if (campusId === 0 && instId === 2) {
    //vskp,gst
    populationUG = vskp["GST"][0][0].total_final_years;
    populationPG = vskp["GST"][1][0].total_final_years;
  }
  if (campusId === 1 && instId === 0) {
    //hyd,git
    populationUG = hyd["GIT"][0][0].total_final_years;
    populationPG = hyd["GIT"][1][0].total_final_years;
  }
  if (campusId === 1 && instId === 1) {
    //hyd,gim
    populationUG = hyd["GIM"][0][0].total_final_years;
    populationPG = hyd["GIM"][1][0].total_final_years;
  }
  if (campusId === 1 && instId === 2) {
    //hyd,gst
    populationUG = hyd["GST"][0][0].total_final_years;
    populationPG = hyd["GST"][1][0].total_final_years;
  }
  if (campusId === 2 && instId === 0) {
    //blr,git
    populationUG = blr["GIT"][0][0].total_final_years;
    populationPG = blr["GIT"][1][0].total_final_years;
  }
  if (campusId === 2 && instId === 1) {
    //blr,gim
    populationUG = blr["GIM"][0][0].total_final_years;
    populationPG = blr["GIM"][1][0].total_final_years;
  }
  if (campusId === 2 && instId === 2) {
    //blr,gst
    populationUG = blr["GST"][0][0].total_final_years;
    populationPG = blr["GST"][1][0].total_final_years;
  }

  //   HorizontalBar data
  const data = {
    labels: ["UnderGraduate", "PostGraduate"],
    datasets: [
      {
        label: [''],
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

  let campuses = ["vskp", "hyd", "blr"]; // this is used in dataUG,dataPG,dataUGPG
  let allInsitutes = ["GIT", "GIM", "GST"]; // this is used in dataUG,dataPG,dataUGPG

  //this function is called when the dataUG button is clicked
  //this function is responsible for displaying the UG data provided the campusId and instId
  const dataUG = () => {
    let total_higher_study_and_pay_crt =
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_higher_study_and_pay_crt;
    let total_not_intrested_in_placments =
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_not_intrested_in_placments;
    let total_backlogs =
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_backlogs;
    let total_students_eligible =
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_students_eligible;
    let total_offers =
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_offers;
    let total_multiple_offers =
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_yet_to_place;

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
    setType("UG")
  };
  const dataPG = () => {
    let total_higher_study_and_pay_crt =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_higher_study_and_pay_crt;
    let total_not_intrested_in_placments =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_not_intrested_in_placments;
    let total_backlogs =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_backlogs;
    let total_students_eligible =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_students_eligible;
    let total_offers =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_offers;
    let total_multiple_offers =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_yet_to_place;

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
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_higher_study_and_pay_crt +
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_higher_study_and_pay_crt;
    let total_not_intrested_in_placments =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_not_intrested_in_placments +
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_not_intrested_in_placments;
    let total_backlogs =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_backlogs +
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_backlogs;
    let total_students_eligible =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_students_eligible +
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_students_eligible;
    let total_offers =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_offers +
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_offers;
    let total_multiple_offers =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_multiple_offers +
      result[campuses[campusId]][allInsitutes[instId]][0][0]
        .total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][1][0].total_placed +
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][1][0]
        .total_yet_to_place +
      result[campuses[campusId]][allInsitutes[instId]][0][0].total_yet_to_place;

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

  return (
    <div className="fetcher">
      <Carousel
      className="fetcher_charts_div"
      useKeyboardArrows={true}
      >         
        <div className="Chart_holder" style={{width:"500px"}}>
          <DoughnutChart
            style={{ boxShadow: "0 3px 10px black;" }}
            campusId={campusId}
            data={dataDoughnut}
            options={optionsDoughnut}
          />
          <p className="legend">Campus-wise Division</p>
        </div>

        <div className="Chart_holder" style={{width:"700px"}}>
          {campusId == 0 ? (
            <VerticalBar campus={totalResult["vskp"]} options={options} />
          ) : null}
          {campusId == 1 ? (
            <VerticalBar campus={totalResult["hyd"]} options={options} />
          ) : null}
          {campusId == 2 ? (
            <VerticalBar campus={totalResult["blr"]} options={options} />
          ) : null}
          <p className="legend">Campus-wise Division</p>
        </div>
        <div className="Chart_holder" style={{width:"700px"}}>
          <HorizontalBarChart data={data} />
        </div>
        <div className="Chart_holder" style={{width:"500px"}}>
          <PieChart data={dataPie} type={type}/>
          <div className="PieButtons">
          <button onClick={dataUG}><Button btnText="UG"></Button></button>
          <button onClick={dataPG}><Button btnText="PG"></Button></button>
          <button onClick={dataUGPG}><Button btnText="UG+PG"></Button></button>
          </div>
        </div>
      </Carousel>
      <div  className="fetcher_content_div">
            <p>
            Gandhi Institute of Technology and Management, formerly GITAM University and GITAM College of Engineering is a private deemed university located in Visakhapatnam, Hyderabad and Bengaluru in India. It was founded in 1980 by Dr. M.V.V.S. Murthi.
            </p>
      </div>
    </div>
  );
}

export default Fetcher;
