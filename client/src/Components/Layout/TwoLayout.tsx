import { useState } from "react";
import { Fragment } from "react/jsx-runtime"
import { Header } from "./Header";
import { Routing } from "../Routes";
import { Grid } from "@mui/material";


export const TwoLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Fragment>
            <Grid>
                <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}></Header>
            </Grid>
        </Fragment>
    )
}