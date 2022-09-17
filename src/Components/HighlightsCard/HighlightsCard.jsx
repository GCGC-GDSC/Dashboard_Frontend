import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import "./HighlightsCardStyles.css";
export default function HighlightsCard({
    year,
    companies,
    placementOffers,
    highestPackage,
    studentsPlaced,
    stylePreview
}) {
  return (
    <Box sx={{ minWidth: 275 }} className="highlightCard" style={stylePreview}>
      <Card variant="outlined" >
        <React.Fragment>
          <CardContent className="highlightCardinner"> 
            <Box >
              <div className="title" >
                <h1>{year} Placement Highlights</h1>
              </div>
              <div className="modalContentSection">
                <div className="item">
                  <ApartmentIcon fontSize="large" />
                  <div className="countup" >
                    <CountUp end={companies} duration={2} />+
                  </div>
                  <p>Companies</p>
                </div>
                <div className="item">
                  <GroupsIcon fontSize="large" />
                  <div className="countup" >
                    <CountUp end={placementOffers} duration={2} />
                  </div>
                  <p>Students Placed</p>
                </div>

                <div className="item">
                  <EmojiEventsIcon fontSize="large" />
                  <div className="countup" >
                    <CountUp end={highestPackage} duration={2} /> L
                  </div>
                  <p>Highest Package</p>
                </div>

                <div className="item">
                  <WorkIcon fontSize="large" />
                  <div className="countup" >
                    <CountUp end={studentsPlaced} duration={2} /> %
                  </div>
                  <p>of Students Placed</p>
                </div>
              </div>
            </Box>
          </CardContent>
         
        </React.Fragment>
      </Card>
    </Box>
  );
}
