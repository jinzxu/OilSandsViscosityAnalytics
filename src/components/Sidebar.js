// src/components/Sidebar.js
import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Pageview as PagesIcon,
  TableChart as TableChartIcon,
  Map as MapIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import styled from "styled-components";

const drawerWidth = 240;

const Sidebar = ({ inputUploaded, correlationDone, onButtonClick }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#343a40",
          color: "#fff",
        },
      }}
    >
      <DrawerContainer>
        <List>
          <ListItem button onClick={() => onButtonClick("input")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Input" />
          </ListItem>
          <ListItem
            button
            disabled={!inputUploaded}
            onClick={() => onButtonClick("correlation")}
          >
            <ListItemIcon sx={{ color: inputUploaded ? "#fff" : "gray" }}>
              <PagesIcon />
            </ListItemIcon>
            <ListItemText primary="Correlation" />
          </ListItem>
          <ListItem
            button
            disabled={!correlationDone}
            onClick={() => onButtonClick("forecast")}
          >
            <ListItemIcon sx={{ color: correlationDone ? "#fff" : "gray" }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Forecast" />
          </ListItem>
          <ListItem button onClick={() => onButtonClick("manual")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Manual" />
          </ListItem>
        </List>
      </DrawerContainer>
    </Drawer>
  );
};

const DrawerContainer = styled.div`
  padding-top: 20px;
`;

export default Sidebar;
