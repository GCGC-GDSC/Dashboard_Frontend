import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
// import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import "./HighlightsCardStyles.css";
// import FunctionsIcon from '@mui/icons-material/Functions';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function HighlightsCard({
    year,
    companies,
    placementOffers,
    highestPackage,
    averagePackage,
    stylePreview,
    ind}) 
{
  return (
    <Box sx={{ minWidth: 275 }} className="highlightCard" style={stylePreview}>
      <Card variant="outlined" >
        <React.Fragment>
          <CardContent className="highlightCardinner"> 
            <Box >
              <div className="highlights_title" >
                <h1>{year}{ind===0?
                <em>
                  <sup style={{fontFamily:"monospace",fontSize:'0.8rem', color:"red"}}>*(in progress)</sup>
                  </em>
                  :null} 
                  &nbsp; Placement Highlights
                  </h1>
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
                    <CountUp end={placementOffers} duration={2} /> +
                  </div>
                  <p>Students Placed</p>
                </div>

                <div className="item">
                  <EmojiEventsIcon fontSize="large" />
                  <div className="countup" >
                    <CountUp end={highestPackage} duration={2} decimals={2} /> L
                  </div>
                  <p>Highest Package</p>
                </div>

                <div className="item">
                  <CurrencyRupeeIcon fontSize="large" />
                  <div className="countup" >
                    <CountUp end={averagePackage} duration={2} 
                    decimals={2}/> L
                  </div>
                  <p>Average Package</p>
                </div>
              </div>
            </Box>
          </CardContent>
         
        </React.Fragment>
      </Card>
    </Box>
  );
}
