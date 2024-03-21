import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";





export const Login = () => {
    const {authenticated, setAuthenticated} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthenticated(true)
    navigate('/')
  }
    return (
        <div>
            
            <button onClick={() => handleLogin()}>Authenticate</button>

        </div>
    )
}