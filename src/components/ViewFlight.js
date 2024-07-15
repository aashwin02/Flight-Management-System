import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditFlight from './EditFlight';

function ViewFlight({ user }) {
    const [flights, setFlights] = useState([]);
    // const [editFlightId, setEditFlightId] = useState(null);

    // const handleEdit = (id) => {
    //     setEditFlightId(id); // Set the flight ID for editing
    // };

    // const handleCloseEdit = () => {
    //     setEditFlightId(null); // Close the edit form
    // };

    useEffect(() => {
        axios.get("http://localhost:8000/flights")
            .then(res => {
                setFlights(res.data);
                //console.log(res.data);
                console.log(flights);
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
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/flights/${id}`)
            .then(res => {
                setFlights(flights.filter(flight => flight.id !== id));
                console.log('Flight deleted:', res.data);
                alert("Flight deleted");
            })
            .catch(error => {
                console.error('Error deleting flight:', error);
                console.log(id);
            });
    };

    return (
        <section class="vh-100 gradient-custom" style={{paddingTop: "20px"}}>
        <div class="container">
            <div class="row">
                {flights.map((flight) => (
                    <div class="col-md-4 mb-4">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-header">
                                {flight.id}
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Airlines: </strong> {flight.Name}</li>
                                <li class="list-group-item"><strong>Origin:</strong> {flight.Source}</li>
                                <li class="list-group-item"><strong>Destination:</strong> {flight.Destination}</li>
                                <li class="list-group-item"><strong>Departure Time:</strong> {flight.Departure_Time}</li>
                                <li class="list-group-item"><strong>Arrival Time:</strong> {flight.Arrival_Time}</li>
                            </ul>
                            <div class="card-body">
                                {user && user.role === "Admin" &&
                                    <a href={`/flights/${flight.id}/edit`} class="btn btn-primary" style={{marginRight: "5px"}}>Edit</a>
                                }
                                {user && user.role === "Admin" &&
                                    <a class="btn btn-danger" onClick={() => handleDelete(flight.id)}>Delete</a>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </section>
        // <div>       
        // {flights.map((flight) => ( 
        //     <div class="card" style={{width: "18rem"}}>
        //         <div class="card-header">
        //             {flight.id}
        //         </div>
        //         <ul class="list-group list-group-flush">
        //             <li key={flight.id}>
        //                 <p>Flight Name: {flight.Name}</p>
        //                 <p>Origin: {flight.Source}</p>
        //                 <p>Destination: {flight.Destination}</p>
        //                 <p>Departure Time: {flight.Departure_Time}</p>
        //                 <p>Arrival Time: {flight.Arrival_Time}</p>
        //             </li>
        //         </ul>
        //     </div>
        // ))}
        // </div>
    )
}

export default ViewFlight;