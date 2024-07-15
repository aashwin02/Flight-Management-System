import { React } from 'react'
import { useNavigate } from 'react-router-dom';


function NavBar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
            <a class="navbar-brand" href="#">Amdocs</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/viewFlight">View Flight</a>
                    </li>
                    {user && user.role === "Admin" && (
                        <li class="nav-item">
                            <a class="nav-link" href="/addFlight">Add Flight</a>
                        </li>)}
                    {user && user.role === "Admin" && (
                        <li class="nav-item">
                            <a class="nav-link" href="/viewUser">View Users</a>
                        </li>)}
                    {user && (
                        <li class="nav-item">
                            <a class="nav-link" href="/bookFlight">Book Ticket</a>
                        </li>)}
                    {user && user.role === "Admin" && (
                        <li class="nav-item">
                            <a class="nav-link" href="/viewBooking">View Bookings</a>
                        </li>)}
                    {!user && (
                        <li class="nav-item">
                            <a class="nav-link " href="/login">Login</a>
                        </li>)}
                    {!user && (
                        <li class="nav-item">
                            <a class="nav-link " href="/signUp">Sign up</a>
                        </li>
                    )}
                    {user && (
                        <li class="nav-item">
                            <a class="nav-link " href="#" onClick={handleLogout}>Logout</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;