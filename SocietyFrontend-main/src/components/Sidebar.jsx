import React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { Link } from "react-router-dom";
import { People } from "@mui/icons-material";

const Sidebar = () => {
    const menuItems = [
        { label: "Dashboard", route: "/dashboard", icon: <DashboardIcon /> },
        { label: "Member", route: "/memberdetail", icon: <People /> },
        { label: "Report", route: "/report", icon: <AssessmentIcon /> },
        { label: "Greeting", route: "/greeting", icon: <EventSeatIcon /> },
        { label: "Guarantor", route: "/guarantorList", icon: <People /> },
        { label: "Notice", route: "/notice", icon: <AssessmentIcon /> }
    ];

    return (
        <Box
            sx={{
                width: 240,
                height: "100vh",
                bgcolor: "#f9fbfd",
                borderRight: "1px solid #e0e0e0",
                p: 2,
            }}
        >
            <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1a237e", mb: 2, textAlign: "center" }}
            >
                CA Co-Operative Socity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
                {menuItems.map((item) => (
                    <ListItem button
                        key={item.label}
                        component={Link}
                        to={item.route}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;