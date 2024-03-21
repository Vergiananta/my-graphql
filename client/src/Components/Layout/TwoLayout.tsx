import { useState } from "react";
import { Fragment } from "react/jsx-runtime"
import { Header } from "./Header";
import { Routing } from "../Routes";
import { Box, Grid, Toolbar, Typography } from "@mui/material";


export const TwoLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const authenticated = localStorage.getItem('token')

    return (
        <Box sx={{ display: "flex" }}>
                <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}></Header>
                <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Typography>
          <Routing/>
        </Typography>
      </Box>
        </Box>
    )
}