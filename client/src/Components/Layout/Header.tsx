import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Sidebar } from "./Sidebar";
import { Routing } from "../Routes";
import { AuthContext } from "../../Context/AuthContext";

interface Props {
  handleDrawerToggle: any
  window?: () => Window;
  mobileOpen: boolean;
}

export const Header = (props: Props) => {
  const {authenticated, setAuthenticated} = React.useContext(AuthContext)

  const { window, mobileOpen, handleDrawerToggle } = props;
  const navItems = ["Home", "About", "Contact"];
  const dashboard = ["Company", "Talent"]
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {authenticated ? navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            )) : dashboard.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                    {item}
                </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <Sidebar navItems={navItems} handleDrawerToggle={props.handleDrawerToggle}/>
        </Drawer>
      </nav>
      
    </>
  );
};
