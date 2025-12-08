import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import RealEstateAgentIcon from "@mui/icons-material/RealEstateAgent";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", route: "/dashboard", icon: <DashboardIcon /> },
        { label: "Member", route: "/memberdetail", icon: <PeopleIcon /> },
        { label: "Report", route: "/report", icon: <AssessmentIcon /> },
        { label: "Loan", route: "/view-loan", icon: <RealEstateAgentIcon /> },
        { label: "Surety Report", route: "/surety-report", icon: <AssessmentIcon /> },
        { label: "Greeting", route: "/greeting", icon: <EventSeatIcon /> },
        { label: "Notice", route: "/notice", icon: <AssessmentIcon /> },
    ];

    return (
        <Box
            sx={{
                width: 240,
                minWidth: 240,
                maxWidth: 240,
                flexShrink: 0,
                height: "100vh",
                bgcolor: "#1a237e",
                borderRight: "1px solid #e0e0e0",
                p: 2,
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                top: 0,
                overflowY: "auto",
            }}
        >
            {/* BRAND TITLE */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "0.5px",
                        fontSize: "17px",
                    }}
                >
                    CA Co-Operative Society
                </Typography>
            </Box>

            <Divider sx={{ mb: 1,}} />

            {/* MENU ITEMS */}
            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.route;

                    return (
                        <ListItemButton
                            key={item.label}
                            component={Link}
                            to={item.route}
                            sx={{
                                mb: 0.5,
                                borderRadius: 2,
                                px: 2,
                                py: 1.3,
                                bgcolor: isActive ? "primary.main" : "transparent",
                                color: "#ffffff",
                                fontWeight: isActive ? "600" : "normal",
                                boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                                "&:hover": {
                                    bgcolor: "primary.main",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "#ffffff",
                                    minWidth: "36px",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: "14px",
                                    fontWeight: isActive ? 600 : 500,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ mt: 2 }} />

            {/* FOOTER SECTION */}
            <Typography
                variant="caption"
                sx={{
                    mt: 2,
                    textAlign: "center",
                    color: "text.secondary",
                }}
            >
                © CA Co-Operative Society • Admin Panel
            </Typography>
        </Box>
    );
};

export default Sidebar;