import React from 'react' ;
import axios from 'axios' ;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddFlight() {
    const [formData,setFormData] = useState({
        // id:'',
        Name:'',
        Source:'',
        Destination:'',
        Departure_Time:'',
        Arrival_Time:'',
    })

    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'id' ? parseInt(value, 10) : value
          }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8000/flights', formData)
          .then(response => {
            console.log('Success:', response.data) ;
            alert("Flight added successfully") ;
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
                <label for="flightName" class="form-label">Flight Name</label>
                <input type="text" class="form-control" id="flightName" name="Name" value={formData.Name} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="source" class="form-label">Source</label>
                <input type="text" class="form-control" id="source" name="Source" value={formData.Source} onChange={handleChange} />
            </div>
            <div class="mb-3">
                <label for="destination" class="form-label">Destination</label>
                <input type="text" class="form-control" id="destination" name="Destination" value={formData.Destination} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="depTime" class="form-label">Departure Time</label>
                <input type="text" class="form-control" id="depTime" name="Departure_Time" value={formData.Departure_Time} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="arrTime" class="form-label">Arrival Time</label>
                <input type="text" class="form-control" id="arrTime" name="Arrival_Time" value={formData.Arrival_Time} onChange={handleChange}/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddFlight ;