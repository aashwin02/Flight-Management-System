import React from 'react' ;
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function BookFlight() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        "Name": '',
        "Flight_id": '',
        "Date": ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'id' ? parseInt(value, 10) : value
          }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8000/bookings', formData)
          .then(response => {
            console.log('Success:', response.data) ;
            alert("Ticket booked successfully") ;
            navigate("/viewFlight") ;
            // Optionally update state or perform other actions upon successful POST
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    return (
        <form onSubmit={handleSubmit}>
            {/* <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" name="id" value={formData.id} onChange={handleChange}/>
            </div> */}
            <div class="mb-3">
                <label for="flightName" class="form-label">Name: </label>
                <input type="text" class="form-control" id="Name" name="Name" value={formData.Name} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="source" class="form-label">Flight ID: </label>
                <input type="text" class="form-control" id="Flight_id" name="Flight_id" value={formData.Flight_id} onChange={handleChange} />
            </div>
            <div class="mb-3">
                <label for="destination" class="form-label">Date: </label>
                <input type="text" class="form-control" id="Date" name="Date" value={formData.Date} onChange={handleChange}/>
            </div>
            {/* <div class="mb-3">
                <label for="depTime" class="form-label">Departure Time</label>
                <input type="text" class="form-control" id="depTime" name="Departure_Time" value={formData.Departure_Time} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="arrTime" class="form-label">Arrival Time</label>
                <input type="text" class="form-control" id="arrTime" name="Arrival_Time" value={formData.Arrival_Time} onChange={handleChange}/>
            </div> */}
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default BookFlight ;