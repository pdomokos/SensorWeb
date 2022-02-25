import React from "react";
import {  BrowserRouter,  Routes,  Route,  Link } from "react-router-dom";
import {Navbar, Nav, NavItem} from 'reactstrap';
import './App.css';
import Home from './Home';
import SensorList from './SensorList';
import SensorEdit from "./SensorEdit";
import SensorNew from "./SensorNew";

function App() {
  return (
    <div className="App">
      <BrowserRouter>  
        <Navbar color="dark" dark expand="md">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="sensors">Sensors</Link>
            </NavItem>
          </Nav>
        </Navbar>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sensors" element={<SensorList />} />
          <Route path="sensors/:id" element={<SensorEdit />} />
          <Route path="sensors/new" element={<SensorNew />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

