import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login({setUser}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "email": '',
        "password": ''
    })


    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(res => {
                setUsers(res.data) ;
            })
            .catch(error => {
                console.log('Error fetching data', error)
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = users.find(user =>
            user.email === formData.email && user.password === formData.password
        );

        if (user) {
            alert("Login successful");
            setUser(user) ;
            navigate("/viewFlight") ;
            
        } else {
            alert("Invalid credentials");
        }
    }
    return (
        <section class="vh-100 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div class="card-body p-5 text-center">

                                <div class="mb-md-5 mt-md-4 pb-5">
                                    <form onSubmit={handleSubmit}>

                                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p class="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" name='email' value={formData.email} onChange={handleChange} />
                                            <label class="form-label" for="typeEmailX">Email</label>
                                        </div>

                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" name='password' value={formData.password} onChange={handleChange} />
                                            <label class="form-label" for="typePasswordX">Password</label>
                                        </div>

                                        {/* <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}

                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </form>
                                </div>

                                <div>
                                    <p class="mb-0">Don't have an account? <a href="/signUp" class="text-white-50 fw-bold">Sign Up</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login ;