import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../PrivateRoute';
import Employeeform from '../employeeform/EmployeeForm';
import '../navbar/navbar.css' 
import Login from '../login/loginemp';
import {isAuthenticated} from '../login/loginemp';
import ConverterCurrency from '../samplebuild/ConverterCurrency';

function myRoutes() {

    return (
            <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/employeeform" element={<Employeeform />} />
                    <Route exact path="/currencyconverter" element={<ConverterCurrency />} />
                    {/* <PrivateRoute path="/dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated} /> */}

            </Routes>
    );
}

export default myRoutes;
