import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios' ;
import { useNavigate, useParams } from 'react-router-dom';


function EditFlight() {
    const navigate = useNavigate();

    const {id} = useParams();

    const [formData, setFormData] = useState({
        id: '',
        Name: '',
        Source: '',
        Destination: '',
        Departure_Time: '',
        Arrival_Time: '',
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/flights/${id}`)
            .then(res => {
                setFormData(res.data); // Populate form with current flight details
            })
            .catch(error => {
                console.error('Error fetching flight details:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'id' ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/flights/${id}`, formData)
            .then(response => {
                console.log('Flight updated: ', response.data);
                alert("Flight updated successfully");
                navigate("/viewFlight") ;
            })
            .catch(error => {
                console.error('Error updating flight:', error);
            });
    }

    return (
        <div className='container'>
            <h2>Edit flight</h2>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="id" class="form-label">ID</label>
                    <input type="text" class="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="flightName" class="form-label">Flight Name</label>
                    <input type="text" class="form-control" id="flightName" name="Name" value={formData.Name} onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="source" class="form-label">Source</label>
                    <input type="text" class="form-control" id="source" name="Source" value={formData.Source} onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="destination" class="form-label">Destination</label>
                    <input type="text" class="form-control" id="destination" name="Destination" value={formData.Destination} onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="depTime" class="form-label">Departure Time</label>
                    <input type="text" class="form-control" id="depTime" name="Departure_Time" value={formData.Departure_Time} onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="arrTime" class="form-label">Arrival Time</label>
                    <input type="text" class="form-control" id="arrTime" name="Arrival_Time" value={formData.Arrival_Time} onChange={handleChange} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditFlight;