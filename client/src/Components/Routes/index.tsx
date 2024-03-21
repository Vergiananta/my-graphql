import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ListOfUsers from '../Users/ListOfUsers';
import { Login } from '../Auth';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const PrivateRouting = () => {
    const {authenticated} = useContext(AuthContext)

    if (!authenticated) return <Navigate to='/login' replace/>

    return <Outlet/>
}

export const Routing = () => {
  return (
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route element={<PrivateRouting/>}>
            <Route path="/" element={<ListOfUsers/>} />
        </Route>
      </Routes>
  );
};
