import React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Cart from './Cart';
import Home from './Home';
import Login from './Login';

import Myorders from './Myorders';
import Register from './REgister';
const App = () => {
  return (
      <Router>
        <Routes>
        <Route path='/home' element={<Protected><Home></Home></Protected>}></Route>
        <Route path='/cart' element={<Protected><Cart></Cart></Protected>}></Route>
        <Route path='/orders' element={<Protected><Myorders></Myorders></Protected>}></Route>
          <Route path='/' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </Router>
  )
}

export default App

export function Protected({children}){
  if(localStorage.getItem("pos-user"))
  return children
  else
  <Navigate to="/login"></Navigate>
}