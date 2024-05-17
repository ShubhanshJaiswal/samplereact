import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Employeeform from '../employeeform/EmployeeForm';
import '../navbar/navbar.css' 

function Navbar() {
    const navigate = useNavigate();

    const dashboard = () => {
        navigate('/dashboard');
    };

    const empform = () => {
        navigate('/employeeform');
    };
    const login = () => {
        navigate('/');
    };
    const currencyconverter = () => {
        navigate('/currencyconverter');
    };
    return (
        <div className=''>               
            <nav className="navbar navbar-expand-lg navdiv">
                <div className="container">
                    <a className="navbar-brand me-2" href="#">
                        Hello
                    </a>

                    <button data-mdb-collapse-init className="navbar-toggler" type="button" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link" onClick={dashboard}>
                                    Dashboard
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={empform}>
                                    Employee Form
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={currencyconverter}>
                                    Currency Converter
                                </button>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <button data-mdb-ripple-init type="button" onClick={login} className="btn btn-link px-3 me-2">
                                Login
                            </button>
                            <button data-mdb-ripple-init type="button" className="btn btn-primary me-3">
                                Sign up for free
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
