import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { unstable_batchedUpdates } from "react-dom";
import Axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DoughnutChart from "../Doughnut/DoughnutChart";
import VerticalBar from "../VerticalBar/VerticalBarChart";
import HorizontalBarChart from "../HorizontalBar/HorizontalBar";
import result from "./localDB";
import PieChart from "../PieChart/PieChart";
import "./Fetcher.style.scss";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import cors from "cors"
import SimpleContainer from "../InfoArea/InfoArea"

function Fetcher() {
  const [totalResult, setTotalResult] = useState({});
  const [showBC, setShowBC] = useState([true, false, false]);
  const [unlockVertChart, setUnlockVC] = useState(false);
  const [unlockHoriChart, setUnlockHC] = useState(false);
  const [slideNo, setSlideNo] = useState(0);
  const [campusId, setCampusId] = useState(0);
  const [instId, setInstId] = useState(0); //this is for institutions like GIT,GST under specific campuses
  const [Hstudents, setHStudents] = useState([]);
  const [Vstudents, setVStudents] = useState([]);
  const [Bstudents, setBStudents] = useState([]);
  const [type, setType] = useState(); // this is for the PieChart Component in the HomePage
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

  // InfoArea states
  const mainHeading = ['chart1Heading','chart2heading','chart3Heading','chart4Heading']
  const  subHeading = ['chart1subHeading','chart2subHeading','chart3subHeading','chart4subHeading']
  const text = ['qwe','asd','zxc','iop']



  // Diffrent colors for UG,PG,UG+PG in PieChart, so will store the colors in an array and pass to the dataPie
  const [pieColors, setPieColors] = useState(['#3C9D4E','#7031AC','#C94D6D','#E4BF58','#4174C9'])
  const { vskp, blr, hyd } = result;
  //  this function iterates over all the campuses and gets the total number of students in total (city wise)
  const getLocalStudents = () => {
    var vskpTotal = 0;
    for (let inst in vskp) {
      let institute = vskp[inst];
      vskpTotal += institute[0].total_students + institute[1].total_students;
    }
    var blrTotal = 0;
    for (let inst in blr) {
      let institute = blr[inst];
      blrTotal += institute[0].total_students + institute[1].total_students;
    }
    var hydTotal = 0;
    for (let inst in hyd) {
      let institute = hyd[inst];
      hydTotal += institute[0].total_students + institute[1].total_students;
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
    console.info("You clicked a breadcrumb.");
  }

  // DoughNut data and options
  //options
  const optionsDoughnut = {
    onClick: function (evt, item) {
      var arr = showBC;
      arr[1] = true;
      if (item[0]) {
        unstable_batchedUpdates(() => {
          setSlideNo((prev) => prev + 1);
          setShowBC(arr);
          setCampusId(item[0].index);
          setUnlockVC(true);
        });
      }
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
        backgroundColor: ["#EC6B56", "#FFC154", " #47B39C"],
        borderColor: ["#EC6B56", "#FFC154", "#47B39C"],
        borderWidth: 2,
      },
    ],
  };

  // VertticalBar chart options
  const optionsVert = {
    onClick: function (evt, item) {
      var arr = showBC;
      arr[2] = true;
      if (item && item[0]) {
        unstable_batchedUpdates(() => {
          setSlideNo((prev) => prev + 1);
          setShowBC(arr);
          setInstId(item[0].index);
          setUnlockHC(true);
        });
      }
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
  const dirCamp = ["vskp", "hyd", "blr"];
  const dirIns = Object.keys(result[dirCamp[campusId]]);
  if (unlockHoriChart && showBC[2]) {
    populationUG =
      result[dirCamp[campusId]][dirIns[instId]][0].total_final_years;
    populationPG =
      result[dirCamp[campusId]][dirIns[instId]][1].total_final_years;
  }
  //   HorizontalBar data
  const dataHC = {
    labels: ["UnderGraduate", "PostGraduate"],
    datasets: [
      {
        label: "# number of students",
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
  let allInsitutes = dirIns; // this is used in dataUG,dataPG,dataUGPG
  //this function is called when the dataUG button is clicked
  //this function is responsible for displaying the UG data provided the campusId and instId
  const dataUG = () => {
    setPieColors([
      "#6050DC",
      "#D52DB7",
      "#FF2E7E",
      "#FF6B45",
      "#FFAB05",
      "rgba(255, 159, 64, 1)",
    ])
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
      result[campuses[campusId]][allInsitutes[instId]][0].total_multiple_offers;
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
          backgroundColor: pieColors,
          borderColor: pieColors,
          borderWidth: 1,
        },
      ],
    });
    setType("UG");
  };
  const dataPG = () => {
    setPieColors(['#F66D44','#FEAE65','#E6F69D','#AADEA7','#64C2A6','#2D87BB'])
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
      result[campuses[campusId]][allInsitutes[instId]][1].total_multiple_offers;
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
          backgroundColor:pieColors,
          borderColor: pieColors,
          borderWidth: 1,
        },
      ],
    });
    setType("PG");
  };
  const dataUGPG = () => {
    setPieColors(['#3C9D4E','#7031AC','#C94D6D','#E4BF58','#4174C9'])
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
      result[campuses[campusId]][allInsitutes[instId]][0].total_multiple_offers;
    let total_placed =
      result[campuses[campusId]][allInsitutes[instId]][1].total_placed +
      result[campuses[campusId]][allInsitutes[instId]][0].total_placed;
    let total_yet_to_place =
      result[campuses[campusId]][allInsitutes[instId]][1].total_yet_to_place +
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
          backgroundColor: pieColors,
          borderColor: pieColors,
          borderWidth: 1,
        },
      ],
    });
    setType("UG + PG");
  };
  const handleIndexChange = (e) => {
    const val = e.target.dataset.name;
    var arr = showBC;
    arr[val] = true;
    for (let i = 0; i < 3; i++) {
      if (i > val) {
        arr[i] = false;
      }
    }
    if (val === 1) {
      unstable_batchedUpdates(() => {
        setShowBC(arr);
        setUnlockVC(true);
        setSlideNo(parseInt(e.target.dataset.name));
      });
    } else {
      unstable_batchedUpdates(() => {
        setShowBC(arr);
        setSlideNo(parseInt(e.target.dataset.name));
      });
    }
  };
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "dark"
        ? theme.palette.grey[100]
        : theme.palette.grey[400];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });
  useEffect(() => {
    getLocalStudents();
    dataUGPG();
  }, []);
  return (
    <div className="fetcher-container">
      <div className="fetcher">
        <div className="fetcher_carousel-container">
          <div className="breadCrumps">
            <div role="presentation">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
              >
                <StyledBreadcrumb component="a" href="#" label="Home" />
                <p data-name="0" onClick={handleIndexChange} style={{cursor:"pointer"}}>
                  University
                </p>
                {unlockVertChart && showBC[1] ? (
                  <p data-name="1" onClick={handleIndexChange} style={{cursor:"pointer"}}>
                    Campus
                  </p>
                ) : null}
                {unlockHoriChart && showBC[2] ? (
                  <span style={{ display: "flex", flexDirection: "row" }}>
                    <span data-name="2" onClick={handleIndexChange}>Institutes</span>
                    <span>
                      <NavigateNextIcon />
                    </span>
                    <span data-name="3" onClick={handleIndexChange}>
                      Graduation system
                    </span>
                  </span>
                ) : null}
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
                campusId={campusId}
                data={dataDoughnut}
                options={optionsDoughnut}
                setUnlockVC={setUnlockVC}
                setSlideNo={setSlideNo}
              />
            </div>
            {unlockVertChart && showBC[1] ? (
              <div className="Chart_holder Chart_holder2">
                <button
                  onClick={() => {
                    unstable_batchedUpdates(() => {
                      setSlideNo((prev) => prev - 1);
                      setUnlockVC(false);
                    });
                  }}
                >
                  {/*  <KeyboardBackspaceIcon/>
                   */}
                  <KeyboardBackspaceIcon />
                </button>
                {campusId === 0 ? (
                  <VerticalBar
                    campus={totalResult["vskp"]}
                    options={optionsVert}
                  />
                ) : null}
                {campusId === 1 ? (
                  <VerticalBar
                    campus={totalResult["hyd"]}
                    options={optionsVert}
                  />
                ) : null}
                {campusId === 2 ? (
                  <VerticalBar
                    campus={totalResult["blr"]}
                    options={optionsVert}
                  />
                ) : null}
              </div>
            ) : (
              <p></p>
            )}
            {unlockHoriChart && showBC[2] ? (
              <div className="Chart_holder Chart_holder2">
                <button
                  onClick={() => {
                    unstable_batchedUpdates(() => {
                      setSlideNo((prev) => prev - 1);
                      setUnlockHC(false);
                    });
                  }}
                >
                  <KeyboardBackspaceIcon fontSize="large" style={{backgroundColor:"white"}}/>
                </button>
                <button onClick={() => setSlideNo((prev) => prev + 1)}>
                  <ArrowRightAltIcon fontSize="medium" />
                </button>
                <HorizontalBarChart
                  data={dataHC}
                  inst={result[dirCamp[campusId]][dirIns[instId]][0]}
                />
              </div>
            ) : (
              <p></p>
            )}
            {unlockHoriChart && showBC[2] ? (
              <div className="Chart_holder">
                <button onClick={() => setSlideNo((prev) => prev - 1)}>
                  <KeyboardBackspaceIcon />
                </button>
                <PieChart
                  instName={
                    result[dirCamp[campusId]][dirIns[instId]][0]
                      .under_institute_name
                  }
                  data={dataPie}
                  type={type}
                />
                <div className="PieButtons">
                  <button onClick={dataUG}>
                    <Button variant="contained" color="success">
                    UnderGrad
                    </Button>
                  </button>
                  <button onClick={dataPG}>
                    <Button variant="contained" color="success">
                    PostGrad 
                    </Button>
                  </button>
                  <button onClick={dataUGPG}>
                    <Button variant="contained" color="success">
                     UG+PG
                    </Button>
                  </button>
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </Carousel>
        </div>
        <div className="fetcher_content_div">
          <SimpleContainer heading={mainHeading[slideNo]} subheading={subHeading[slideNo]} text={text[slideNo]}/>
        </div>
      </div>
    </div>
  );
}

export default Fetcher;
