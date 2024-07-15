import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function ViewBooking() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/bookings")
            .then(res => {
                setBookings(res.data);
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
    }, []);



    return (
        <section class="vh-100 gradient-custom" style={{ paddingTop: "20px" }}>
            <div class="container">
                <div class="row">
                    {bookings.map((booking) => (
                        <div class="col-md-4 mb-4">
                            <div class="card" style={{ width: "18rem" }}>
                                <div class="card-header">
                                    {booking.id}
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><strong>Name: </strong> {booking.Name}</li>
                                    <li class="list-group-item"><strong>Flight ID:</strong> {booking.Flight_id}</li>
                                    <li class="list-group-item"><strong>Date:</strong> {booking.Date}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ViewBooking;