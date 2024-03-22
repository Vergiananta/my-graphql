import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../Context/AuthContext";
import { Grid } from "@mui/material";
import { log } from "console";





export const Login = () => {
  const { authenticated, toggleAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    toggleAuthenticated()
    console.log('handleLogin: ',authenticated);
    
    navigate('/')
  }
    return (
        <Grid>
            
            <button onClick={handleLogin}>{authenticated ? "Logout" : "Login"}</button>

        </Grid>
    )
}