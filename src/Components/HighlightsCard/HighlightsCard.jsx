import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import "./HighlightsCardStyles.css";

export default function HighlightsCard({
  companies,
  placed,
  highestPackage,
  offPlacements,
  year,
}) {
  return (
    <Box sx={{ minWidth: 275 }} className="highlightCard">
      <Card variant="outlined" >
        <React.Fragment>
          <CardContent className="highlightCardinner"> 
            <Box >
              <div className="title">
                <h1>2021-22 Placement Highlights</h1>
              </div>
              <div className="modalContentSection">
                <div className="item">
                  <ApartmentIcon fontSize="large" />
                  <div className="countup">
                    <CountUp end={140} duration={2} />+
                  </div>
                  <p>Companies</p>
                </div>
                <div className="item">
                  <GroupsIcon fontSize="large" />
                  <div className="countup">
                    <CountUp end={1699} duration={2} />
                  </div>
                  <p>Students Placed</p>
                </div>

                <div className="item">
                  <AutoFixHighIcon fontSize="large" />
                  <div className="countup">
                    <CountUp end={45} duration={2} /> L
                  </div>
                  <p>Highest Package</p>
                </div>

                <div className="item">
                  <FindReplaceIcon fontSize="large" />
                  <div className="countup">
                    <CountUp end={45} duration={2} /> %
                  </div>
                  <p>Off Placements</p>
                </div>
              </div>
            </Box>
          </CardContent>
         
        </React.Fragment>
      </Card>
    </Box>
  );
}
