import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useNavigate } from "react-router-dom";
export default function TemporaryDrawer({ signout }) {
  const anchor = "right";
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="drawer-highlights" disablePadding>
          <ListItemButton onClick={() => navigate("/highlights")}>
            <ListItemIcon>
              <AutoFixHighIcon />
            </ListItemIcon>
            <ListItemText primary="Highlights" />
          </ListItemButton>
        </ListItem>
        <ListItem key="drawer-team" disablePadding>
          <ListItemButton onClick={() => navigate("/team")}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItemButton>
        </ListItem>
        <ListItem key="drawer-logout" disablePadding style={{ color: "red" }}>
          <ListItemButton onClick={signout}>
            <ListItemIcon>
              <LogoutIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
