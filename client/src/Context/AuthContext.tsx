import { log } from "console";
import { ReactNode, createContext, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";


type Props = {
    children?: ReactNode
}

type IAuthContext = {
    authenticated: boolean;
    toggleAuthenticated: () => void;
}

const initialValue = {
    authenticated: false,
    toggleAuthenticated: () => {} 
}

const AuthContext = createContext<IAuthContext>(initialValue)

const useAuth = () => {
    console.log('terpanggil');
    
   return useContext(AuthContext)};


const AuthProvider = ({children}: Props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(initialValue.authenticated);

    const toggleAuthenticated = () => {        
        setAuthenticated((prevState) => !prevState);
        console.log('togle',authenticated);
        
    };

    return (
        <AuthContext.Provider value={{authenticated, toggleAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuth, AuthProvider}
