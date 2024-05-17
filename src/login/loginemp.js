import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login/login.css'
import { scrambletxt } from '../resources/js/scramble.js'
import { ParticleComponent } from '../resources/js/particle.js'
import particlesConfig from '../resources/json/particles.json'
import { togglePasswordVisibility, cancelToggle, toggleiconVisibility } from '../resources/js/login.js'
import Navbar from '../navbar/Navigationbar.js';

export var isAuthenticated = false;
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erros, setErrors] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        scrambletxt('Activate Machine');
        ParticleComponent(particlesConfig);
    }, []);
    const handleInputChange = (e, value) => {
        if (value === 'email') {
            toggleiconVisibility();
            setEmail(e.target.value);
        }
        else {
            setPassword(e.target.value);
        }
    }
    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setErrors(m => ({ ...m, email: 'Invalid Email Format..' }));
                    return;
                }
                let emp = { 'Id': 0, 'Email': email.trim(), 'Password': password.trim() };
                axios.post('https://localhost:7242/Employee/login', emp).then(response => {
                    window.Swal.fire({
                        title: 'Login!',
                        text: 'Credentials Matched. Welcome..',
                        icon: 'success',
                        allowOutsideClick: false,
                        confirmButtonText: 'Dashboard'
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            if (response.data.status) {

                                function generateSHA(string) {
                                    const sha = crypto.createHash('sha256');
                                    sha.update(string);
                                    return sha.digest('hex');
                                }
                                const shaHash = generateSHA(email.trim());
                                localStorage.setItem('loggedinuser');
                                navigate('/dashboard');
                                isAuthenticated = true;
                            }
                        }
                    });
                }).catch(response => {
                    alert(response.response.data);
                });
            }
            else {
                alert('Something Went Wrong.');
                return false;
            }
        }
        catch (ex) {
            alert('Something Went Wrong. Try Again later..');
            return false;
        }
    }
    return (
        <div className=''>
            <Navbar/>
            <div className="maindiv">
                <div id="particles-js"></div>
                <div className="login-box">
                    <div className="Scrambletext"></div>
                    <form id="loginform" onSubmit={e => { handlesubmit(e) }}>
                        <div className="user-box">
                            <input type="text" name="email" required={true} onInput={e => { handleInputChange(e, 'email') }} />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required={true} className="password-input" id="passwordInput" onInput={e => { handleInputChange(e, 'pass') }} />
                            <label>Password</label>
                            <i className="toggle-password fas fa-eye" onMouseDown={togglePasswordVisibility} onMouseUp={cancelToggle} id="eyeIcon"></i>
                        </div>
                        <span className='text-danger'>{erros.email}</span>
                        <div className="error-message text-center text-danger "></div>
                        <div className="text-center ">
                            <button type="submit " className='anispan'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Activate
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default Login;
