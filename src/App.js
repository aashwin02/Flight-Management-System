import logo from './logo.svg';
import NavBar from './components/NavBar';
import ViewFlight from './components/ViewFlight';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import AddFlight from './components/AddFlight';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import EditFlight from './components/EditFlight';
import ViewUsers from './components/ViewUsers';
import BookFlight from './components/BookFlight';
import ViewBooking from './components/ViewBooking';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <Router>
      <div>
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/viewFlight" element={<ViewFlight user={user} />} />
          {user && user.role === "Admin" && (
            <Route path="/addFlight" element={<AddFlight />} />
          )}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signUp" element={<SignUp />} />
          {user && user.role === "Admin" && (
            <Route path="/flights/:id/edit" element={<EditFlight />} />
          )}
          {user && user.role === "Admin" && (
            <Route path="/viewUser" element={<ViewUsers />} />
          )}
          {user && (
            <Route path="/bookFlight" element={<BookFlight />} />
          )}
          {user && (
            <Route path='/viewBooking' element={<ViewBooking />} />
          )}
        </Routes>

      </div>
    </Router>
  );
}

export default App;
