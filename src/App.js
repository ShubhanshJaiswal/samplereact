// Filename - App.js

import React from "react";

import Dashboard from "./dashboard/Dashboard";
import Employeeform from "./employeeform/EmployeeForm";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "../src/navbar/Navigationbar";
import Myroutes from "../src/myRoutes/myRoutes"
import Login from "./login/loginemp";

function App() {
  return (
    <>
     <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
      <Myroutes />
    </>
  );
}

export default App;
