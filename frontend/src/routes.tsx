import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import UsersForm from './pages/Users/Form';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/newUser" element={<UsersForm />} />
      <Route path="/users/editUser/:id" element={<UsersForm />} />
    </Routes>
  );
};

export default AppRoutes;
