import { useState } from "react";
import { Fragment } from "react/jsx-runtime"
import { Header } from "./Header";
import { Routes } from "../Routes";
import { Grid } from "@mui/material";


export const TwoLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Fragment>
            <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}></Header>
            <Routes/>
        </Fragment>
    )
}