import React, { useEffect, useState } from "react";
import axios from 'axios' ;

function ViewUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/users")
            .then(res => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.log('Server responded with non 2xx status:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Error setting up the request:', error.message);
                }
                //console.error('Error fetching data:', error);
            });
    },[]);

    return (
        <section class="vh-100 gradient-custom" style={{paddingTop: "20px"}}>
        <div class="container">
            <div class="row">
                {users.map((user) => (
                    <div class="col-md-4 mb-4">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-header">
                                {user.id}
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Name: </strong> {user.name}</li>
                                <li class="list-group-item"><strong>Email:</strong> {user.email}</li>
                                <li class="list-group-item"><strong>Role:</strong> {user.role}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </section>
    )
}

export default ViewUsers;