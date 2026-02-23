import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import About from './pages/About';

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={
          <PrivateRoute role="CUSTOMER"><CustomerDashboard /></PrivateRoute>
        } />
        <Route path="/employee" element={
          <PrivateRoute role="EMPLOYEE"><EmployeeDashboard /></PrivateRoute>
        } />
        <Route path="/manager" element={
          <PrivateRoute role="MANAGER"><ManagerDashboard /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}