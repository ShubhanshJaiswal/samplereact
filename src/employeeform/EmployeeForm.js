import '../employeeform/employeeform.css';
import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { sendData } from '../reducers/actions'
import Navbar from "../navbar/Navigationbar";
import { useNavigate } from 'react-router-dom';


function EmployeeForm(props) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const isAnyFieldFilled = name || email || phone || password;
  const savetext = (id == 0) ? 'Add' : 'Update';
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  var loader = document.getElementById('loader');
  // Function to add a new employee
  const addEmployee = async () => {
    const model = { id, name, email, phone, password };
    try {
      loader.style.display = 'block';
      if (id == 0) {
        axios.post('https://localhost:7242/Employee/AddEmployee', model)
          .then(response => {
            alert(response.data);
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setId(0);
          })
          .catch(error => {
            alert(error.response.data);
          });

        loader.style.display = 'none';
      }
      else {
        console.log('employee id=' + id)
        await axios.post('https://localhost:7242/Employee/UpdateEmployeeDetails', model, {
          params: {
            id: id
          }
        })
          .then(response => {
            alert(response.data);
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setId(0);
          })
          .catch(error => {
            alert(error.response.data);
          });

        loader.style.display = 'none';
      }

      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure to delete this data?')) {
        await axios.delete('https://localhost:7242/Employee/DeleteEmployeeDetails?id=' + id);
        fetchEmployees(); // Refresh the list of employees after deleting
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setId(0);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Function to update an employee
  const updateEmployee = (index, updatedEmployee) => {

  };
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;

    // Validate Name
    if (!name.trim()) {
      setErrors(m => ({ ...m, name: 'Name is required.' }));
      formIsValid = false;
    } else {
      setErrors(m => ({ ...m, name: '' }));
    }
    if (!phone.trim()) {
      setErrors(m => ({ ...m, phone: 'Phone is required' }));
      formIsValid = false;
    } else if (phone.trim().length != 10) {
      setErrors(m => ({ ...m, phone: 'Phone umber Should be 10 Digit.' }));
      formIsValid = false;
    } else {
      setErrors(m => ({ ...m, phone: '' }));
    }
    if (!email.trim()) {
      setErrors(m => ({ ...m, email: 'Email is required.' }));
      formIsValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
      setErrors(m => ({ ...m, email: 'Invalid email format.' }));
      formIsValid = false;
    } else {
      setErrors(m => ({ ...m, email: '' }));
    }

    if (!password.trim()) {
      setErrors(m => ({ ...m, password: 'Password is required.' }));
      formIsValid = false;
    } else {
      setErrors(m => ({ ...m, password: '' }));
    }

    if (formIsValid) {
      addEmployee();
      console.log('Form submitted');
    }

  };
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
        fetchEmployees();
        didMountRef.current = true;
    } else {
        if (props.data && props.data > 0) {
            showEmployee(props.data);
            props.sendData(null);
        }
    }
    var data=localStorage.getItem('loggedinuser');
    if(!data){
      navigate('/');
    }
}, [props.data]);// This useEffect runs once when the component mounts

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7242/Employee/GetEmployeeList');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  const handleInputChange = (e, fieldName) => {
    // Clear the error message for the corresponding field when user starts typing
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));

    // Update the field value
    let value = e.target.value.trim();
    switch (fieldName) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        // Only allow numeric characters for the phone number
        if (value.length != 10) {
          setErrors(m => ({ ...m, phone: 'Phone umber Should be 10 Digit.' }));
        }
        if (!/^\d*$/.test(value)) {
          setErrors(prevErrors => ({ ...prevErrors, phone: 'Phone must contain only numbers' }));
          return;
        }
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const showEmployee = async (id) => {
    var loader = document.getElementById('loader');
    loader.style.display = 'block';
    const response = await axios.get('https://localhost:7242/Employee/GetEmployeeDetails?id=' + id);
    setName(response.data.name);
    setEmail(response.data.email);
    setPhone(response.data.phone);
    setPassword(response.data.password);
    setId(response.data.id);
    loader.style.display = 'none';
    setErrors(m => ({ ...m, phone: '' }));
    setErrors(m => ({ ...m, name: '' }));
    setErrors(m => ({ ...m, email: '' }));
    setErrors(m => ({ ...m, password: '' }));

  };
  const resetform = async () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setId(0);
    setErrors(m => ({ ...m, phone: '' }));
    setErrors(m => ({ ...m, name: '' }));
    setErrors(m => ({ ...m, email: '' }));
    setErrors(m => ({ ...m, password: '' }));
  };
  return (
    <div className="">
      <Navbar/>
      <div className='container maindiv1'>
        <form className='myform' onSubmit={handleSubmit} >
          <div className='text-center'>
            <h3>Employee Form</h3>
            <hr />
          </div>
          <input type="hidden" value={id} />
          <div>
            <label>Name</label>
            <input type="text" className='form-control' placeholder="Enter Name" value={name} onChange={(e) => handleInputChange(e, 'name')} />
            <span className='text-danger'>{errors.name}</span>
          </div>
          <div>
            <label>Phone</label>
            <input type="text" className='form-control' placeholder="Phone" value={phone} onChange={(e) => handleInputChange(e, 'phone')} />
            <span className='text-danger'>{errors.phone}</span>
          </div>
          <div>
            <label>Email</label>
            <input type="text" className='form-control' placeholder="Email" value={email} onChange={(e) => handleInputChange(e, 'email')} />
            <span className='text-danger'>{errors.email}</span>
          </div>
          <div>
            {id === 0 && (
              <div>
                <label>Password</label>
                <input
                  type="password"
                  className='form-control'
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handleInputChange(e, 'password')}
                />
                <span className='text-danger'>{errors.password}</span>
              </div>
            )}
          </div>
          <div className='mt-2'>
            <button className='btn btn-success' type="submit">{savetext}</button>
            <button className='btn btn-danger ms-3' type="reset" onClick={() => resetform()} disabled={!isAnyFieldFilled}>Reset</button>
          </div>
        </form>
      </div>


      {/* Display list of employees */}
      <div className='container'>
        <div className='text-center mt-lg-5'>
          <h3>
          <div>{props.data}</div>Employee Table
          </h3>
          <hr />
        </div>
        <table className='table table-bordered table-hover table-striped '>
          <thead>
            <tr className=''>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td className='text-center'>
                  <button className='btn btn-primary ' onClick={() => showEmployee(employee.id)}>Edit</button>
                  <button className='btn btn-danger ms-2' onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='loaderdiv' id='loader'>
        <div className='loader'>
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.yourReducer.data,
});
export default connect(mapStateToProps,{sendData})(EmployeeForm);