import axios from "axios";
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendData } from '../reducers/actions';
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/Navigationbar";
import '../dashboard/dashboard.css'

function Dashboard(props) {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [employees, setEmployees] = useState([]);
    const [originalEmployees, setoriginalEmployees] = useState([]);

    useEffect(() => {
        var data = localStorage.getItem('loggedinuser');
        if (!data) {
            navigate('/')
        }
        getemployees();
    }, []);
    const getemployees = async () => {
        await axios.get('https://localhost:7242/Employee/GetEmployeeList')
            .then(response => {
                setEmployees(response.data);
                setoriginalEmployees(response.data);
            }).catch(error => {
                alert('Unable to Get Data: ' + error);
            });
    };
    const loadEmployee = async (id) => {
        props.sendData(id);
        navigate('/employeeform');
    };
    const deleteEmployee = async (id) => { };
    const searchtext = async (e) => {
        var prefix = e.target.value.toLowerCase();
        if (prefix) {
            const filteredEmployees = originalEmployees.filter(employee => {
                return (employee.name.toLowerCase().includes(prefix) || employee.email.toLowerCase().includes(prefix) || employee.phone.includes(prefix));
            });
            setEmployees(filteredEmployees);
        } else {
            setEmployees(originalEmployees);
        }
    }

    return (
        <div className="">
            <Navbar />
            <div className=" container">
                <div className="dashboarddiv">
                    <div className="row">
                        <div className="col-9">
                            <h3>Employee Table</h3>
                        </div>
                        <div className="col-3 searchtextbox">
                            <input type="text" onChange={(e) => searchtext(e)} />
                        </div>
                        <hr />
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee.name}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.email}</td>
                                        <td className="text-center">
                                            <button className="btn btn-primary" onClick={() => loadEmployee(employee.id)}><i className="fa fa-edit" aria-hidden="true"></i>Edit</button>
                                            <button className="btn btn-danger ms-2" onClick={() => deleteEmployee(employee.id)}><i className="fa fa-trash" aria-hidden="true"></i>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div></div></div>
        </div>
    );
}

export default connect(null, { sendData })(Dashboard);
