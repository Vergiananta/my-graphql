import { Route, Routes } from 'react-router-dom';
import ListOfUsers from '../Users/ListOfUsers';
import { Login } from '../Auth';

export const Routing = () => {
  return (
      <Routes>
        <Route path="/" element={<ListOfUsers/>} />
        <Route path='/auth/login' element={<Login/>}/>
      </Routes>
  );
};
