import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SignUp() {
    const [formData, setFormData] = useState({
        "name": '',
        "email": '',
        "password": '',
        "role": ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/users', formData)
            .then(response => {
                console.log('Success:', response.data);
                alert("Sign up successfully");
                // Optionally update state or perform other actions upon successful POST
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <section class="vh-120 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style={{ borderRadius: "1rem"}}>
                            <div class="card-body p-5 text-center">

                                <div class="mb-md-5 mt-md-4 pb-5">
                                    <form onSubmit={handleSubmit}>

                                        <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
                                        <p class="text-white-50 mb-5">Please enter your details!</p>

                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="text" id="typeNameX" className="form-control form-control-lg" name='name' value={formData.name} onChange={handleChange} />
                                            <label class="form-label" for="typeNameX">Name</label>
                                        </div>


                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" name='email' value={formData.email} onChange={handleChange} />
                                            <label class="form-label" for="typeEmailX">Email</label>
                                        </div>

                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" name='password' value={formData.password} onChange={handleChange} />
                                            <label class="form-label" for="typePasswordX">Password</label>
                                        </div>
                                        <div className="mb-3">
                                            <select class="form-control" name='role' value={formData.role} onChange={handleChange}>
                                                <option>Select your role</option>
                                                <option>Admin</option>
                                                <option>Customer</option>
                                            </select>
                                        </div>

                                        {/* <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}

                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Sign up</button>
                                    </form>
                                </div>

                                <div>
                                    <p class="mb-0">Already registered? <a href="/login" class="text-white-50 fw-bold">Login</a>
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

export default SignUp;