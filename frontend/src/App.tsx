import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Router from './routes';
import Header from './components/Header';

function App() {
  return (
  <BrowserRouter>
    <Header />
    <Router />
  </BrowserRouter>
  );
}

export default App;
